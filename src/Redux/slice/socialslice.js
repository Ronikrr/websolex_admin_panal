import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000/api/socialdetails";

// Fetch social details
export const fetchSocialDetails = createAsyncThunk(
    "social/fetchDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch social details"
            );
        }
    }
);

// Update or Create social details
export const updateSocialDetails = createAsyncThunk(
    "social/updateDetails",
    async (socialDetails, { rejectWithValue }) => {
        const { _id, ...payload } = socialDetails; // Separate _id from body data

        const apiUrl = _id ? `${API}/${_id}` : API; // Use _id for updates
        const method = _id ? "PUT" : "POST";

        try {
            const response = await fetch(apiUrl, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),  // Send only actual payload data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update social details");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "An error occurred");
        }
    }
);



// Slice
const socialSlice = createSlice({
    name: "social",
    initialState: {
        data: { facebook: "", whatsapp: "", instagram: "", linkedin: "", },
        status: "idle",  // loading, succeeded, failed
        error: null,
        feedback: { message: "", type: "" }, // To show success/error messages
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch details cases
            .addCase(fetchSocialDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSocialDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchSocialDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Update details cases
            .addCase(updateSocialDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.feedback = {
                    message: "Social details updated successfully!",
                    type: "success",
                };
            })
            .addCase(updateSocialDetails.rejected, (state, action) => {
                state.feedback = {
                    message: `Error: ${action.payload}`,
                    type: "error",
                };
            });
    },
});

export const { clearFeedback } = socialSlice.actions;
export default socialSlice.reducer;
