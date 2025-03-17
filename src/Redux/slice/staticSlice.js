// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = "https://websolex-admin.vercel.app/api";

// export const fetchStatics = createAsyncThunk(
//     "statics/fetch",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(`${API}/setstatic`);
//             return res.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// export const updateStatics = createAsyncThunk(
//     "statics/post",
//     async (formdata, { rejectWithValue }) => {
//         try {
//             const method = formdata.id ? "PUT" : "POST";
//             const res = await fetch(`${API}/setstatic`, {
//                 method,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formdata),
//             });

//             if (!res.ok) throw new Error("Failed to update statics");
//             return await res.json();
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const staticSlice = createSlice({
//     name: "statics",
//     initialState: {
//         statics: {
//             successfulproject: 0,
//             joiningcomparies: 0,
//             registeredcustomers: 0,
//         },
//         status: "idle",
//         error: null,
//         feedback: { message: "", type: "" },
//     },
//     reducers: {
//         clearFeedback: (state) => {
//             state.feedback = { message: "", type: "" };
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchStatics.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(fetchStatics.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.statics = action.payload;
//             })
//             .addCase(fetchStatics.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.payload;
//             })
//             .addCase(updateStatics.fulfilled, (state, action) => {
//                 state.statics = action.payload;
//                 state.feedback = { message: "Statics updated successfully!", type: "success" };
//             })
//             .addCase(updateStatics.rejected, (state, action) => {
//                 state.feedback = { message: `Error: ${action.payload}`, type: "error" };
//             })
           
//     },
// });

// export const { clearFeedback } = staticSlice.actions;
// export default staticSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://websolex-admin.vercel.app/api";

// Fetch statics data
export const fetchStatics = createAsyncThunk(
    "statics/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API}/setstatic`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update statics data
export const updateStatics = createAsyncThunk(
    "statics/post",
    async (formdata, { rejectWithValue }) => {
        try {
            const method = formdata.id ? "PUT" : "POST";
            const res = await fetch(`${API}/setstatic`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });

            if (!res.ok) console.log("Failed to update statics");
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const staticSlice = createSlice({
    name: "statics",
    initialState: {
        statics: {
            successfulproject: 0,
            joiningcomparies: 0,
            registeredcustomers: 0,
        },
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
            .addCase(fetchStatics.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStatics.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.statics = action.payload;
            })
            .addCase(fetchStatics.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateStatics.fulfilled, (state, action) => {
                state.statics = action.payload;
                state.feedback = { message: "Statics updated successfully!", type: "success" };
            })
            .addCase(updateStatics.rejected, (state, action) => {
                state.feedback = { message: `Error: ${action.payload}`, type: "error" };
            });
    },
});

export const { clearFeedback } = staticSlice.actions;
export default staticSlice.reducer;
