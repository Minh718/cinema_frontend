import axios from "axios";
import { baseURL } from "../constants/baseURL";
import axiosInstance from "./axiosInstance";

export const processSeatsBooking = async (data) => {
    return {
        "id": 12345,
        "userId": "user-abc-789",
        "showTimeId": 67890,
        "totalPrice": 130500,
        "paymentStatus": "UNPAID",
        "urlPayment": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?txnRef=12345&amount=130500"
    }
    const res = await axiosInstance.post(
        baseURL + `/bookings/save`
        , data);
    return res.result;
}
export const getDetailBooking = async (bookingId) => {
    return {
        "id": 12345,
        "userId": "user-abc-789",
        "showTimeId": 67890,
        "totalPrice": 130500,
        "paymentStatus": "UNPAID",
        "bookingStatus": "CONFIRMED",
        "urlPayment": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?txnRef=12345&amount=130500"
    }
    const res = await axiosInstance.get(
        baseURL + `/bookings/${bookingId}`
        , data);
    return res.result;
}
