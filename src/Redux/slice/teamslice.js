import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:8000/api/v1/teampage";
import { API_URL } from '../../envdata';
const API = `${API_URL}/teampage`;
// Fetch team members
export const fetchteams = createAsyncThunk("teampage/fetch", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(API);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Failed to fetch team members");
    }
});

// Add team member
export const addteamMember = createAsyncThunk("teampage/add", async (formData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Failed to add team member");
    }
});

// Update team member
export const updateTeamMember = createAsyncThunk("teampage/update", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Failed to update team member");
    }
});

// Delete team member
export const deleteTeamMember = createAsyncThunk("teampage/delete", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Failed to delete team member");
    }
});

const teamMemberSlice = createSlice({
    name: "teamMember",
    initialState: {
        teamMember: [],
        selectedTeamMember: null,
        status: "idle",
        error: null,
        feedback: { message: "", type: "" }
    },
    reducers: {
        clearFeedback: (state) => {
            state.feedback = { message: "", type: "" };
        },
        setSelectedTeamMember: (state, action) => {
            state.selectedTeamMember = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchteams.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchteams.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.teamMember = action.payload;
            })
            .addCase(fetchteams.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(addteamMember.fulfilled, (state, action) => {
                state.teamMember.push(action.payload);
                state.feedback = { message: "Team member added successfully!", type: "success" };
            })
            .addCase(addteamMember.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(updateTeamMember.fulfilled, (state, action) => {
                state.teamMember = state.teamMember.map((member) =>
                    member._id === action.payload._id ? action.payload : member
                );
                state.feedback = { message: "Team member updated successfully!", type: "success" };
            })
            .addCase(updateTeamMember.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            })
            .addCase(deleteTeamMember.fulfilled, (state, action) => {
                state.teamMember = state.teamMember.filter((member) => member._id !== action.payload);
                state.feedback = { message: "Team member deleted successfully!", type: "success" };
            })
            .addCase(deleteTeamMember.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.feedback = { message: action.payload, type: "error" };
            });
    }
});

export const { clearFeedback, setSelectedTeamMember } = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
