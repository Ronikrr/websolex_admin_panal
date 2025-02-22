// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// // const API = "https://websolex-admin.vercel.app/api/valuedclients"
// const API = "http://localhost:8000/api/valuedclients"
// export const fetchvaluedclient = createAsyncThunk("valuedclient/fetch",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await fetch(API);
//             if (!res.ok) throw new Error("Failed to fetch data");

//             const data = await res.json();
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );


// export const addvaluedClient = createAsyncThunk(
//     "valuedclient/add",
//     async (formdata, { rejectWithValue }) => {
//         try {
//             const res = await axios.post(API, formdata, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             })
//             const data = res.json()
//             return data
//         } catch (error) {
//             return rejectWithValue(error.res?.data || "failed to add valuedClients")
//         }
//     }
// )

// export const updateValuedClient = createAsyncThunk(
//     "valuedclient/update",
//     async ({ _id, fromdata }, { rejectWithValue }) => {
//         try {
//             const res = await axios.put(`${API}/${_id}`, fromdata, {
//                 headers: { "Content-Type": "mutipart/from-data" }
//             })
//             return res.data
//         } catch (error) {
//             return rejectWithValue(error.res?.data)
//         }
//     }
// )

// export const deleteValuedClient = createAsyncThunk(
//     "valuedclient/delete",
//     async (id, { rejectWithValue }) => {
//         try {
//             await axios.delete(`${API}/${id}`)
//             return id;
//         } catch (error) {
//             return rejectWithValue(error.res.data)
//         }
//     }
// )

// export const ValuedClientSlice = createSlice({
//     name: "valuedclient",
//     initialState: {
//         valuedclient: [],
//         selectedvaluedclient: null,
//         status: 'idle',
//         error: null,
//         feedback: { message: '', type: '' }
//     },
//     reducers: {
//         clearFeedback: (state) => {
//             state.feedback = { message: "", type: '' }
//         },
//         setSelectedvaluedclient: (state, action) => {
//             state.selectedvaluedclient = action.payload;
//         }
//     },
//      extraReducers: (builder) => {
//             builder
//                 .addCase(fetchvaluedclient.pending, (state) => {
//                     state.status = "loading";
//                 })
//                 .addCase(fetchvaluedclient.fulfilled, (state, action) => {
//                     state.status = "succeeded";
//                     state.valuedclient = action.payload;
//                 })
//                 .addCase(fetchvaluedclient.rejected, (state, action) => {
//                     state.status = "failed";
//                     state.error = action.payload;
//                     state.feedback = { message: action.payload, type: "error" };
//                 })
//                 .addCase(addvaluedClient.fulfilled, (state, action) => {
//                     state.valuedclient.push(action.payload);
//                     state.feedback = { message: "Employee added successfully!", type: "success" };
//                 })
//                 .addCase(addvaluedClient.rejected, (state, action) => {
//                     state.status = "failed";
//                     state.error = action.payload;
//                     state.feedback = { message: action.payload, type: "error" };
//                 })
//                 .addCase(updateValuedClient.fulfilled, (state, action) => {
//                     state.valuedclient = state.valuedclient.map((valuedclient) =>
//                         valuedclient._id === action.payload.id ? action.payload : valuedclient
//                     );
//                     state.feedback = { message: "Employee updated successfully!", type: "success" };
//                 })
//                 .addCase(updateValuedClient.rejected, (state, action) => {
//                     state.status = "failed";
//                     state.error = action.payload;
//                     state.feedback = { message: action.payload, type: "error" };
//                 })
//                 .addCase(deleteValuedClient.fulfilled, (state, action) => {
//                     state.valuedclient = state.valuedclient.filter((valuedclient) => valuedclient._id !== action.payload);
//                     state.feedback = { message: "Employee deleted successfully!", type: "success" };
//                 })
//                 .addCase(deleteValuedClient.rejected, (state, action) => {
//                     state.status = "failed";
//                     state.error = action.payload;
//                     state.feedback = { message: action.payload, type: "error" };
//                 });
//         }
// })
// export const { clearFeedback, setSelectedOurwork } = ValuedClientSlice.actions;

// export default ValuedClientSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000/api/valuedclients";

export const fetchvaluedclient = createAsyncThunk("valuedclient/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error("Failed to fetch data");
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addvaluedClient = createAsyncThunk(
    "valuedclient/add",
    async (formdata, { rejectWithValue }) => {
        try {
            const res = await axios.post(API, formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add valued client");
        }
    }
);

export const updateValuedClient = createAsyncThunk(
    "valuedclient/update",
    async ({ id, formdata }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API}/${id}`, formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update valued client");
        }
    }
);

export const deleteValuedClient = createAsyncThunk(
    "valuedclient/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete valued client");
        }
    }
);

export const ValuedClientSlice = createSlice({
    name: "valuedclient",
    initialState: {
        valuedclient: [],
        selectedvaluedclient: null,
        status: "idle",
        error: null,
        feedback: { message: "", type: "" }
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
        setSelectedvaluedclient: (state, action) => {
            state.selectedvaluedclient = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchvaluedclient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchvaluedclient.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.valuedclient = action.payload;
            })
            .addCase(fetchvaluedclient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(addvaluedClient.fulfilled, (state, action) => {
                state.valuedclient.push(action.payload);
                state.feedback = { message: "Employee added successfully!", type: "success" };
            })
            .addCase(addvaluedClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(updateValuedClient.fulfilled, (state, action) => {
                state.valuedclient = state.valuedclient.map((valuedclient) =>
                    valuedclient._id === action.payload._id ? action.payload : valuedclient
                );
                state.feedback = { message: "Employee updated successfully!", type: "success" };
            })
            .addCase(updateValuedClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(deleteValuedClient.fulfilled, (state, action) => {
                state.valuedclient = state.valuedclient.filter((valuedclient) => valuedclient._id !== action.payload);
                state.feedback = { message: "Employee deleted successfully!", type: "success" };
            })
            .addCase(deleteValuedClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            });
    }
});

export const { clearFeedback, setSelectedvaluedclient } = ValuedClientSlice.actions;
export default ValuedClientSlice.reducer;
