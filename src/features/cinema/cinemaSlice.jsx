// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import haversine from "haversine-distance";
import { getAllCinemas } from "../../api/cinema";

// Example cinema data (replace this with your API)
const cinemas = [
  { id: 1, name: "Cinema A", lat: 10.762622, lon: 106.660172 },
  { id: 2, name: "Cinema B", lat: 10.762913, lon: 106.682171 },
  { id: 3, name: "Cinema C", lat: 21.028511, lon: 105.804817 },
];

export const getNearestCinema = createAsyncThunk(
  "cinema/getNearest",
  async (_, thunkAPI) => {
    try {
      // const cinemas = await getAllCinemas();
      const userLocation = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          let nearest = cinemas[0];
          return { cinemaId: nearest.id, cinemas };
        }

        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            }),
          (err) => reject(new Error(err.message))
        );
      });

      let nearest = cinemas[0];
      let minDistance = haversine(userLocation, cinemas[0]);

      for (let i = 1; i < cinemas.length; i++) {
        const dist = haversine(userLocation, cinemas[i]);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = cinemas[i];
        }
      }
      console.log({ cinemaId: nearest.id, userLocation, cinemas });
      return { cinemaId: nearest.id, userLocation, cinemas };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to get nearest cinema"
      );
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cinemas: null,
    cinemaId: null,
    userLocation: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCinemaManually: (state, action) => {
      state.cinemaId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNearestCinema.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNearestCinema.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cinemaId = action.payload.cinemaId;
        state.cinemas = action.payload.cinemas;
        state.userLocation = action.payload.userLocation;
      })
      .addCase(getNearestCinema.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCinemaManually } = cinemaSlice.actions;
export default cinemaSlice.reducer;
