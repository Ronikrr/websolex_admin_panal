import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "https://websolex-admin.vercel.app";

export const fetchalluser = createAsyncThunk(
    "users/fetchuser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/users`);
            if (!res.ok) console.log("Failed to fetch data");

            const data = await res.json();
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user");
        }
    }
)
// Register User
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
);
// patch User
export const patchuserstatus = createAsyncThunk(
    "patch/user",
    async ({ userId, newStatus }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/approve_user`, {
                userId,
                status: newStatus
            });
            return res.data;
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
            const res = await axios.post(`${API_URL}/login`, userData);
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
            const res = await axios.get(`${API_URL}/profile`, {
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
            const res = await axios.put(`${API_URL}/profile`, updatedData, {
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
    async (userId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/users/${userId}`);
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
                console.log("Fetched Users:", action.payload);
                state.loading = false;
                state.users = Array.isArray(action.payload) ? action.payload : [];
                state.feedback = { message: "Users fetched successfully.", type: "success" };
                console.log("after Users:", action.payload);
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
                state.feedback = { message: "Profile fetched successfully.", type: "success" };
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
            });
    },

});

export default apiSlice.reducer;

