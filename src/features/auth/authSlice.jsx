import { createSlice } from "@reduxjs/toolkit";

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const { username, password } = credentials;

//       // Fake delay
//       await new Promise((res) => setTimeout(res, 1000));

//       if (username === "admin" && password === "1234") {
//         return {
//           user: { username: "admin", role: "admin" },
//           token: "fake-jwt-token",
//         };
//       } else {
//         return thunkAPI.rejectWithValue("Invalid credentials");
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Something went wrong");
//     }
//   }
// );
export const authSlice = createSlice(
  {
    name: "auth",
    initialState: {
      keycloak: null,
      token: null,
      isAuthenticated: false,
      user: null,
    },
    reducers: {
      setAuth(state, action) {
        state.keycloak = action.payload.keycloak;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      },
      logout(state) {
        state.keycloak = null;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      },
    },
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       Cookies.set("accessToken", action.payload.accessToken);
  //       Cookies.set("refreshToken", action.payload.refreshToken);
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
);

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
