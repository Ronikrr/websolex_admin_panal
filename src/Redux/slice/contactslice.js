import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from '../../envdata';
const API = `${API_URL}/contactdetails`;


export const fetchContactDetails = createAsyncThunk(
    "contactdetails/fetch",
    async (_, { rejectWithvalue }) => {
        try {
            const res = await axios.get(API);
            return res.data;
        } catch (error) {
            return rejectWithvalue(
                error.res?.data || "Faild to fetch contact Details"
            );
        }
    }
);

export const updateContactDetails = createAsyncThunk(
    "social/update",
    async (contactDetails) => {
        const response = await fetch(API, {
            method: contactDetails.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactDetails),
        });

        const data = await response.json();
        return data;
    }
);

const contactslice = createSlice({
    name: "contact",
    initialState: {
        data: { address: "", phoneno: "", avaliablity: "", email: "" },
        status: "idle",
        error: null,
        feedback: { message: "", type: "" },
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchContactDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchContactDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateContactDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.feedback = {
                    message: "Client rate updated successfully!",
                    type: "success",
                };
            })
            .addCase(updateContactDetails.rejected, (state, action) => {
                state.feedback = {
                    message: `Error: ${action.error.message}`,
                    type: "error",
                };
            });
    },
});
export const { clearFeedback } = contactslice.actions;
export default contactslice.reducer;
