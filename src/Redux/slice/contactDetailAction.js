import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://websolex-admin.vercel.app/"

export const fetchcontactform = createAsyncThunk(
    "contactform/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API}/view_contactform`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res?.data || "Faild to fetch cotactform")
        }
    }
)

export const fetchsubcribe = createAsyncThunk(
    "subcribe/fetch",
    async (_,{rejectWithValue}) => {
        try {
            const res = await axios.get(`${API}/subscribe`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res?.data || "Faild to fetch cotactform")
        } 
    }
)