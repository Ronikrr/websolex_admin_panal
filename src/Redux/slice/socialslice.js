import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://websolex-admin.vercel.app/api/socialdetails";

export const fetchSocialDetails = createAsyncThunk(
    "socialdetails/fetch",
    async (_, { rejectWithvalue }) => {
        try {
            const res = await axios.get(API);
            return res.data;
        } catch (error) {
            return rejectWithvalue(
                error.res?.data || "Faild to fetch social Details"
            );
        }
    }
);

export const updateSocialDetails = createAsyncThunk(
    "social/update",
    async (socialDetails) => {
        const response = await fetch(API, {
            method: socialDetails.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(socialDetails),
        });

        const data = await response.json();
        return data;
    }
);

const socialslice = createSlice({
    name: "social",
    initialState: {
        data: {
            facebook: "",
            whatsapp: "",
            instagram: "",
            linkedin: "",
        },
        status: "idle",
        error: null,
        feedback: null,
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(updateSocialDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.feedback = {
                    message: "Client rate updated successfully!",
                    type: "success",
                };
            })
            .addCase(updateSocialDetails.rejected, (state, action) => {
                state.feedback = {
                    message: `Error: ${action.error.message}`,
                    type: "error",
                };
            });
    },
});
export const { clearFeedback } = socialslice.actions;
export default socialslice.reducer;
