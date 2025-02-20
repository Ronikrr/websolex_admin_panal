import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://websolex-admin.vercel.app/api/project";

// Fetch project data
export const fetchProject = createAsyncThunk("project/fetchProject", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(API);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Update project data
export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (formData, { rejectWithValue }) => {
        try {
            const method = formData.id ? "PUT" : "POST";
            const res = await axios({
                url: API,
                method,
                data: formData,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const projectSlice = createSlice({
    name: "project",
    initialState: {
        data: {
            totalClients: 0,
            completedProjects: 0,
        },
        feedback: { message: "", type: "" },
        status: "idle",
        error: null,
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.data = action.payload;
                state.feedback = { message: "Project updated successfully!", type: "success" };
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.feedback = { message: `Error: ${action.payload}`, type: "error" };
            });
    },
});

export const { clearFeedback } = projectSlice.actions;

export default projectSlice.reducer;
