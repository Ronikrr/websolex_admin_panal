import { createSlice } from "@reduxjs/toolkit";
import { fetchcontactform, fetchsubcribe } from "./contactDetailAction";

const initialState = {
    contactData: [],
    subscribeData: [],
    loading: false,
    error: null,
    feedback: ({ message: '', type: "" })

}
const contactDetailSlice = createSlice({
    name: "contactfrom",
    initialState,
    reducers: {
        clearFeedbackMessage: (state) => {
            state.feedback = ({ message: '', type: "" });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchcontactform.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = ({ message: '', type: "" });
            })
            .addCase(fetchcontactform.fulfilled, (state, action) => {
                state.loading = false;
                state.contactData = action.payload;
                state.feedback = ({ message: '', type: "" });
            })
            .addCase(fetchcontactform.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = ({ message: 'Failed to fetch contact form data.', type: "error" });
            })
            .addCase(fetchsubcribe.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = ({ message: '', type: "" });
            })
            .addCase(fetchsubcribe.fulfilled, (state, action) => {
                state.loading = false;
                state.contactData = action.payload;
                state.feedback = ({ message: '', type: "" });
            })
            .addCase(fetchsubcribe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = ({ message: 'Failed to fetch contact subscribe data.', type: "error" });
            })
    }
})

export const { clearFeedbackMessage } = contactDetailSlice.actions;

export default contactDetailSlice.reducer;