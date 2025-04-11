import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from '../envdata';
const API = `${API_URL}/user`;
// const API_URL = "http://localhost:8000";
// const API_URL = "http://localhost:8000/api/v1/user";

export const fetchalluser = createAsyncThunk(
    "users/fetchuser",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get(`${API}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user");
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/register`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
);
// patch User
export const patchuserstatus = createAsyncThunk(
    "patch/user",
    async ({ userId, newStatus }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.patch(
                `${API}/pending-approvals`,
                { userId, status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const UserStatusChange = createAsyncThunk(
    "user/status",
    async ({ userId, newStatus }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            await axios.patch(
                `${API}/status/${userId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Explicitly return only what's needed for reducer
            return { userId, newStatus };
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const UserRoleChange = createAsyncThunk(
    "user/role",
    async ({ userId, newRole }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            await axios.patch(
                `${API}/role/${userId}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return { userId, newRole };
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Login User
export const loginuser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API}/login`, userData);
            localStorage.setItem("Admintoken_websolex", res.data.token);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// Get User Profile
export const getuserprofile = createAsyncThunk(
    "auth/profile",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get(`${API}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

// Update User Profile
export const updateuserprofile = createAsyncThunk(
    "auth/profile/update",
    async (updatedData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(`${API}/profile`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update profile");
        }
    }
);
export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (userId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            await axios.delete(`${API}/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return userId; // Return the userId to remove it from the state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("Admintoken_websolex");
    return null;
});

const apiSlice = createSlice({
    name: "apislice",
    initialState: {
        users: [],  // Store list of users
        user: null,  // Store the logged-in user
        token: localStorage.getItem("Admintoken_websolex") || null,
        loading: false,
        error: null,
        feedback: { message: "", type: "" }
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchalluser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(fetchalluser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.feedback = { message: "", type: "" };
            })
            .addCase(fetchalluser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to fetch users.", type: "error" };
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.feedback = { message: "Registration successful!", type: "success" };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Registration failed. Please try again.", type: "error" };
            })
            // Patch user status
            .addCase(patchuserstatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(patchuserstatus.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
                state.feedback = { message: "Status updated successfully!", type: "success" };
            })
            .addCase(patchuserstatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to update status. Please try again.", type: "error" };
            })
            // Login
            .addCase(loginuser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(loginuser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.feedback = { message: "Login successful!", type: "success" };
            })
            .addCase(loginuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Login failed. Please try again.", type: "error" };
            })
            // Fetch User Profile
            .addCase(getuserprofile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getuserprofile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.feedback = { message: "", type: "" };
            })
            .addCase(getuserprofile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to fetch profile.", type: "error" };
            })
            // Update User Profile
            .addCase(updateuserprofile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateuserprofile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.feedback = { message: "Profile updated successfully.", type: "success" };
            })
            .addCase(updateuserprofile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to update profile.", type: "error" };
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);  // Remove user from the list
                state.feedback = { message: "User deleted successfully.", type: "success" };
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to delete user.", type: "error" };
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = null;
                state.feedback = { message: "Logged out successfully.", type: "success" };
            })
            // Delete User
            .addCase(UserStatusChange.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(UserStatusChange.fulfilled, (state, action) => {
                state.loading = false;
                const { userId, newStatus } = action.payload;
                state.users = state.users.map(user =>
                    user._id === userId ? { ...user, status: newStatus } : user
                );
                state.feedback = { message: "User status updated successfully.", type: "success" };
            })
            .addCase(UserStatusChange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to update user status.", type: "error" };
            })
            .addCase(UserRoleChange.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.feedback = { message: "", type: "" };
            })
            .addCase(UserRoleChange.fulfilled, (state, action) => {
                state.loading = false;
                const { userId, newRole } = action.payload;
                state.users = state.users.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                );
                state.feedback = { message: "User role updated successfully.", type: "success" };
            })
            .addCase(UserRoleChange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.feedback = { message: "Failed to update user role.", type: "error" };
            })


    },

});

export default apiSlice.reducer;

