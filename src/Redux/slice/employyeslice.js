import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://websolex-admin.vercel.app/api/employee";

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

// Add Employee
export const addEmployee = createAsyncThunk(
    "employee/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post(API, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error: Failed to add employee");
        }
    }
);

// Update Employee
export const updateEmployee = createAsyncThunk(
    "employee/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API}/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error: Failed to update employee");
        }
    }
);

// Patch Employee Status
export const patchEmployee = createAsyncThunk(
    "employee/patchStatus",
    async ({ id, newStatus }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API}/${id}`, { status: newStatus });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update status");
        }
    }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete employee");
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
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
                state.feedback = { message: "Employee added successfully!", type: "success" };
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.map((employee) =>
                    employee._id === action.payload.id ? action.payload : employee
                );
                state.feedback = { message: "Employee updated successfully!", type: "success" };
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter((employee) => employee._id !== action.payload);
                state.feedback = { message: "Employee deleted successfully!", type: "success" };
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            });
    }
});

export const { clearFeedback, setSelectedEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
