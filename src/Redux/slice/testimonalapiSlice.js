import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:8000/api/v1/";
import { API_URL } from '../../envdata';
const API = `${API_URL}/clientrate`;
// Fetch all client rates
export const fetchclientrate = createAsyncThunk(
    "clientrate/fetchclientrate",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch client rates");
        }
    }
);

// Add a new client rate
export const addclientrate = createAsyncThunk(
    "clientrate/addclientrate",
    async (formData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; 
            const response = await axios.post(API, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add client rate");
        }
    }
);

// Update an existing client rate
export const updateclientrate = createAsyncThunk(
    "clientrate/updateclientrate",
    async ({ id, data }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; 
            const response = await axios.put(`${API}/${id}`, data, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update client rate");
        }
    }
);

// Delete a client rate
export const deleteclientrate = createAsyncThunk(
    "clientrate/deleteclientrate",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; 
            await axios.delete(`${API}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete client rate");
        }
    }
);

// Create Redux Slice
const testimonalapiSlice = createSlice({
    name: "clientrate",
    initialState: {
        clientrate: [],
        selectedclientrate: null,
        status: "idle",
        error: null,
        feedback: { message: "", type: "" },
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
        setSelectedclientrate: (state, action) => {
            state.selectedclientrate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchclientrate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchclientrate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.clientrate = action.payload; // Corrected state update
            })
            .addCase(fetchclientrate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addclientrate.fulfilled, (state, action) => {
                state.clientrate.push(action.payload); // Corrected state update
                state.feedback = { message: "Client rate added successfully!", type: "success" };
            })
            .addCase(addclientrate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = {
                    message: action.payload,
                    type: 'error'
                }
            })
            .addCase(updateclientrate.fulfilled, (state, action) => {
                state.clientrate = state.clientrate.map((clientrate) =>
                    clientrate._id === action.payload._id ? action.payload : clientrate
                );
                state.feedback = { message: "Client rate updated successfully!", type: "success" };
            })
            .addCase(updateclientrate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = {
                    message: action.payload,
                    type: 'error'
                }
            })
            .addCase(deleteclientrate.fulfilled, (state, action) => {
                state.clientrate = state.clientrate.filter((clientrate) => clientrate._id !== action.payload);
                state.feedback = { message: "Client rate deleted successfully!", type: "success" };
            })
            .addCase(deleteclientrate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = {
                    message: action.payload,
                    type: 'error'
                }
            });
    },
});

// Export actions and reducer
export const { clearFeedback, setSelectedclientrate } = testimonalapiSlice.actions;
export default testimonalapiSlice.reducer;
