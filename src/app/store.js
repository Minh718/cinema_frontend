import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cinemaReducer from '../features/cinema/cinemaSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cinema: cinemaReducer
    },
});