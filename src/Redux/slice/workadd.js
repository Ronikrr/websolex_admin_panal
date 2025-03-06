// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API = "http://localhost:8000";
// // Fetch all day history - async thunk
// export const fetchAllDayHistory = createAsyncThunk('workLog/fetchAllDayHistory', async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.get(`${API}/all-day-history`);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Failed to fetch user history");
//     }
// });

// // Fetch specific user's history
// export const fetchdailyHistory = createAsyncThunk(
//     "workLog/fetchDayHistory",
//     async ({ userId }, { rejectWithValue, getState }) => {
//         try {
//             const token = getState().auth.token;
//             const response = await axios.get(`${API}/worklogbyuser/${userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`  // if your `authenticate` expects a token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch user history");
//         }
//     }
// );

// // Add new work log
// export const addwork = createAsyncThunk(
//     "workLog/addWork",
//     async (formData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${API}/add`, formData);
//             return response.data;
//         } catch (error) {
//             console.log(error.response?.data || "Failed to add work log")
//             return rejectWithValue(error.response?.data || "Failed to add work log");

//         }
//     }
// );

// const workLogSlice = createSlice({
//     name: 'workLog',
//     initialState: {
//         dailyHistory: {},   
//         allhistory: [],     
//         status: 'idle',
//         feedback: null
//     },
//     reducers: {
//         clearFeedback: (state) => {
//             state.feedback = { message: "", type: "" };
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch all-day history (for admin)
//             .addCase(fetchAllDayHistory.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchAllDayHistory.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.dailyHistory = action.payload;
//             })
//             .addCase(fetchAllDayHistory.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.feedback = { message: action.payload, type: "error" };
//             })

//             // Fetch individual user history
//             .addCase(fetchdailyHistory.fulfilled, (state, action) => {
//                 state.allhistory = action.payload;
//             })
//             .addCase(fetchdailyHistory.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.feedback = { message: action.payload, type: "error" };
//             })

//             // Add work log
//             .addCase(addwork.fulfilled, (state, action) => {
//                 const date = action.payload.date;
//                 if (state.dailyHistory[date]) {
//                     state.dailyHistory[date].push(action.payload);
//                 } else {
//                     state.dailyHistory[date] = [action.payload];
//                 }
//                 state.feedback = {
//                     message: "Work log added successfully!",
//                     type: "success",
//                 };
//             })
//             .addCase(addwork.rejected, (state, action) => {
//                 const errorMessage = action.payload?.message || "Failed to add work log";
//                 state.status = "failed";

//                 state.feedback = {
//                     message: errorMessage,
//                     type: "error"
//                 };
//             })

//     }
// });

// export default workLogSlice.reducer;
// export const { clearFeedback } = workLogSlice.actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:8000";

// Fetch all-day history (for admin)
export const fetchAllDayHistory = createAsyncThunk('workLog/fetchAllDayHistory', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/all-day-history`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch all history");
    }
});

// Fetch specific user's history (with optional date filter)
export const fetchdailyHistory = createAsyncThunk(
    "workLog/fetchDailyHistory",
    async ({ userId, date }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get(`${API}/worklogbyuser/${userId}`, {
                params: { date },  // Pass date if available
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user history");
        }
    }
);

// Add new work log
export const addwork = createAsyncThunk(
    "workLog/addWork",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/add`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add work log");
        }
    }
);

const workLogSlice = createSlice({
    name: 'workLog',
    initialState: {
        dailyHistory: [],  // This holds the work log for a single user (filtered)
        allhistory: [],    // This holds the complete work log for all users
        status: 'idle',
        feedback: null
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all work logs (admin view)
            .addCase(fetchAllDayHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllDayHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allhistory = action.payload;  // <- Fixed here
            })
            .addCase(fetchAllDayHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.feedback = { message: action.payload, type: "error" };
            })

            // Fetch specific user's work log (filtered by date if needed)
            .addCase(fetchdailyHistory.fulfilled, (state, action) => {
                state.dailyHistory = action.payload;  // <- Fixed here
            })
            .addCase(fetchdailyHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.feedback = { message: action.payload, type: "error" };
            })

            // Add work log
            .addCase(addwork.fulfilled, (state, action) => {
                state.feedback = {
                    message: "Work log added successfully!",
                    type: "success",
                };
            })
            .addCase(addwork.rejected, (state, action) => {
                state.status = "failed";
                state.feedback = {
                    message: action.payload?.message || "Failed to add work log",
                    type: "error"
                };
            });
    }
});

export default workLogSlice.reducer;
export const { clearFeedback } = workLogSlice.actions;
