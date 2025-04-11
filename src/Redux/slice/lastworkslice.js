import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API = "http://localhost:8000/api/v1/lastwork";
import { API_URL } from '../../envdata';
const API = `${API_URL}/lastwork`;


export const fetchourwork = createAsyncThunk("ourwork/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(API);
        if (!response.ok) console.log("Failed to fetch data");
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addOurWork = createAsyncThunk(
    "ourwork/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post(API, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.res?.data || "fail to add ourwork")
        }
    }
)

export const updateOurwork = createAsyncThunk(
    "ourwork/update",
    async ({ id, formdata }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API}/${id}`, formdata, {
                headers: { "Content-Type": "multipart/from-data" }
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.res?.data || "fail to update ourwork")
        }
    }
)

export const deleteOurwork = createAsyncThunk(
    "ourwork/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete ourwork");
        }
    }
);
const ourworkSlice = createSlice({
    name: "ourwork",
    initialState: {
        ourwork: [],
        selctedourwork: null,
        status: 'idle',
        error: null,
        feedback: { message: "", type: '' }
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: '', type: '' }
        },
        setSelectedOurwork: (state, action) => {
            state.selctedourwork = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchourwork.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchourwork.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.ourwork = action.payload;
            })
            .addCase(fetchourwork.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(addOurWork.fulfilled, (state, action) => {
                state.ourwork.push(action.payload);
                state.feedback = { message: "Employee added successfully!", type: "success" };
            })
            .addCase(addOurWork.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(updateOurwork.fulfilled, (state, action) => {
                state.ourwork = state.ourwork.map((ourwork) =>
                    ourwork._id === action.payload.id ? action.payload : ourwork
                );
                state.feedback = { message: "Employee updated successfully!", type: "success" };
            })
            .addCase(updateOurwork.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(deleteOurwork.fulfilled, (state, action) => {
                state.ourwork = state.ourwork.filter((ourwork) => ourwork._id !== action.payload);
                state.feedback = { message: "Employee deleted successfully!", type: "success" };
            })
            .addCase(deleteOurwork.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            });
    }
})
export const { clearFeedback, setSelectedOurwork } = ourworkSlice.actions;

export default ourworkSlice.reducer