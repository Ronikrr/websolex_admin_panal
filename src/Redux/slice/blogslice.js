import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from '../../envdata';
const API = `${API_URL}/blogpage`;


// Fetch blogs from API
export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (_, { rejectWithValue,getState }) => {
        try {
            const token = getState().auth.token; // Assuming you have a token in your auth slice
            const response = await axios.get(API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch blogs");
        }
    }
);

// Add new blog
export const addBlog = createAsyncThunk(
    "blogs/addBlog",
    async (formData, { rejectWithValue,getState }) => {
        try {
            const token = getState().auth.token; // Assuming you have a token in your auth slice
            const response = await axios.post(API, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            return response.data.blogadd.savedblogadd;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add blog");
        }
    }
);

// Update existing blog
export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async ({ id, formData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; 
            const response = await axios.put(`${API}/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            return response.data.updatedBlog;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update blog");
        }
    }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id, { rejectWithValue,getState }) => {
        try {
            const token = getState().auth.token; 
            await axios.delete(`${API}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete blog");
        }
    }
);

// Redux slice
const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        selectedBlog: null,
        status: "idle",
        error: null,
        feedback: { message: "", type: "" },
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
        setSelectedBlog: (state, action) => {
            state.selectedBlog = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = {
                    message: action.payload,
                    type: "error"
                };
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
                state.feedback = {
                    message: "Blog added successfully!",
                    type: "success",
                };
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { 
                    message: action.payload, 
                    type: "error"
                 };
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.map((blog) =>
                    blog._id === action.payload._id ? action.payload : blog
                );
                state.feedback = {
                    message: "Blog updated successfully!",
                    type: "success",
                };
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = {
                     message: action.payload, 
                    type: "error" 
                };
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
                state.feedback = {
                    message: "Blog deleted successfully!",
                    type: "success",
                };
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { 
                    message: action.payload, 
                    type: "error"
                 };
            });
    },
});

export const { clearFeedback, setSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
