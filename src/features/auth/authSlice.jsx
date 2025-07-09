import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Fake async login API call
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { username, password } = credentials;

      // Fake delay
      await new Promise((res) => setTimeout(res, 1000));

      if (username === "admin" && password === "1234") {
        return {
          user: { username: "admin", role: "admin" },
          token: "fake-jwt-token",
        };
      } else {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    const accessToken = Cookies.get("accessToken"); // Get access token from localStorage

    if (!accessToken) return thunkAPI.rejectWithValue("No token");

    try {
      const res = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data; // { user: ... }
    } catch (err) {
      return thunkAPI.rejectWithValue("Invalid or expired token");
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("accessToken", action.payload.accessToken);
        Cookies.set("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        localStorage.removeItem("token");
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
