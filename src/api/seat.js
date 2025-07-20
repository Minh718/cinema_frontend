import axios from "axios";
import { baseURL } from "../constants/baseURL";
import axiosInstance from "./axiosInstance";

export const getBookedSeatsOfShowTime = async (showtimeId) => {
    return [1, 4, 5, 65, 77, 45, 43, 24, 76, 34];
    const res = await axiosInstance.get(
        baseURL + `/seats/${showtimeId}/booked`
    );
    return res.result;


}

export const getheatSeatsOfShowTime = async (showtimeId) => {
    return [2, 11, 21, 60, 70, 46, 44, 22, 99, 32];
    const res = await axiosInstance.get(
        baseURL + `/seats/${showtimeId}/heat`
    );
    return res.result;


}