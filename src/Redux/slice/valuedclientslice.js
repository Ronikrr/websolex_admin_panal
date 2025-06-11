import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:8000/api/v1/valuedclients";
import { API_URL } from '../../envdata';
const API = `${API_URL}/valuedclients`;

export const fetchvaluedclient = createAsyncThunk("valuedclient/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(API);
            if (!res.ok) console.log("Failed to fetch data");
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addvaluedClient = createAsyncThunk(
    "valuedclient/add",
    async (formdata, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.post(API, formdata, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add valued client");
        }
    }
);

export const updateValuedClient = createAsyncThunk(
    "valuedclient/update",
    async ({ id, formdata }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(`${API}/${id}`, formdata, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update valued client");
        }
    }
);

export const deleteValuedClient = createAsyncThunk(
    "valuedclient/delete",
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
