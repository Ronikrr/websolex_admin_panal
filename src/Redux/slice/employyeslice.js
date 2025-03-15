import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000/employee";

// Fetch Employees
export const fetchEmployee = createAsyncThunk(
    "employee/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch employees");
        }
    }
);

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        selectedEmployee: null,
        status: 'idle',
        error: null,
        feedback: { message: '', type: '' }
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: '', type: '' };
        },
        setSelectedEmployee: (state, action) => {
            state.selectedEmployee = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployee.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.employees = action.payload;
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
    }
});

export const { clearFeedback, setSelectedEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
