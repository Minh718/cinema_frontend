/* eslint-disable no-unreachable */
import axios from "axios";
import { baseURL } from "../constants/baseURL";
import axiosInstance from "./axiosInstance";

export const getAllCinemas = async () => {
    return [
        { id: 1, name: "Cinema A", lat: 10.762622, lon: 106.660172, address: "123 Main Street, Anytown, USA" },
        { id: 2, name: "Cinema B", lat: 10.762913, lon: 106.682171, address: "456 Elm Street, Anytown, USA" },
        { id: 3, name: "Cinema C", lat: 21.028511, lon: 105.804817, address: "789 Oak Street, Anytown, USA" },
    ]
    const res = await axios.get(
        baseURL + `/cinemas/public`
    );

    return res.result;
};

export const getDetailRoomByRoomId = async (roomId) => {

    return {
        "id": 1,
        "name": "Room A",
        "numberOfRows": 10,
        "screenType": "IMAX",
        "seatsPerRow": 10,
        "seats": [
            { "id": 1, "row": 1, "code": "A1", "status": "available" },
            { "id": 2, "row": 1, "code": "A2", "status": "available" },
            { "id": 3, "row": 1, "code": "A3", "status": "available" },
            { "id": 4, "row": 1, "code": "A4", "status": "available" },
            { "id": 5, "row": 1, "code": "A5", "status": "available" },
            { "id": 6, "row": 1, "code": "A6", "status": "available" },
            { "id": 7, "row": 1, "code": "A7", "status": "available" },
            { "id": 8, "row": 1, "code": "A8", "status": "available" },
            { "id": 9, "row": 1, "code": "A9", "status": "available" },
            { "id": 10, "row": 1, "code": "A10", "status": "available" },

            { "id": 11, "row": 2, "code": "B1", "status": "available" },
            { "id": 12, "row": 2, "code": "B2", "status": "available" },
            { "id": 13, "row": 2, "code": "B3", "status": "available" },
            { "id": 14, "row": 2, "code": "B4", "status": "available" },
            { "id": 15, "row": 2, "code": "B5", "status": "available" },
            { "id": 16, "row": 2, "code": "B6", "status": "available" },
            { "id": 17, "row": 2, "code": "B7", "status": "available" },
            { "id": 18, "row": 2, "code": "B8", "status": "available" },
            { "id": 19, "row": 2, "code": "B9", "status": "available" },
            { "id": 20, "row": 2, "code": "B10", "status": "available" },

            { "id": 21, "row": 3, "code": "C1", "status": "available" },
            { "id": 22, "row": 3, "code": "C2", "status": "available" },
            { "id": 23, "row": 3, "code": "C3", "status": "available" },
            { "id": 24, "row": 3, "code": "C4", "status": "available" },
            { "id": 25, "row": 3, "code": "C5", "status": "available" },
            { "id": 26, "row": 3, "code": "C6", "status": "available" },
            { "id": 27, "row": 3, "code": "C7", "status": "available" },
            { "id": 28, "row": 3, "code": "C8", "status": "available" },
            { "id": 29, "row": 3, "code": "C9", "status": "available" },
            { "id": 30, "row": 3, "code": "C10", "status": "available" },

            { "id": 31, "row": 4, "code": "D1", "status": "available" },
            { "id": 32, "row": 4, "code": "D2", "status": "available" },
            { "id": 33, "row": 4, "code": "D3", "status": "available" },
            { "id": 34, "row": 4, "code": "D4", "status": "available" },
            { "id": 35, "row": 4, "code": "D5", "status": "available" },
            { "id": 36, "row": 4, "code": "D6", "status": "available" },
            { "id": 37, "row": 4, "code": "D7", "status": "available" },
            { "id": 38, "row": 4, "code": "D8", "status": "available" },
            { "id": 39, "row": 4, "code": "D9", "status": "available" },
            { "id": 40, "row": 4, "code": "D10", "status": "available" },

            { "id": 41, "row": 5, "code": "E1", "status": "available" },
            { "id": 42, "row": 5, "code": "E2", "status": "available" },
            { "id": 43, "row": 5, "code": "E3", "status": "available" },
            { "id": 44, "row": 5, "code": "E4", "status": "available" },
            { "id": 45, "row": 5, "code": "E5", "status": "available" },
            { "id": 46, "row": 5, "code": "E6", "status": "available" },
            { "id": 47, "row": 5, "code": "E7", "status": "available" },
            { "id": 48, "row": 5, "code": "E8", "status": "available" },
            { "id": 49, "row": 5, "code": "E9", "status": "available" },
            { "id": 50, "row": 5, "code": "E10", "status": "available" },

            { "id": 51, "row": 6, "code": "F1", "status": "available" },
            { "id": 52, "row": 6, "code": "F2", "status": "available" },
            { "id": 53, "row": 6, "code": "F3", "status": "available" },
            { "id": 54, "row": 6, "code": "F4", "status": "available" },
            { "id": 55, "row": 6, "code": "F5", "status": "available" },
            { "id": 56, "row": 6, "code": "F6", "status": "available" },
            { "id": 57, "row": 6, "code": "F7", "status": "available" },
            { "id": 58, "row": 6, "code": "F8", "status": "available" },
            { "id": 59, "row": 6, "code": "F9", "status": "available" },
            { "id": 60, "row": 6, "code": "F10", "status": "available" },

            { "id": 61, "row": 7, "code": "G1", "status": "available" },
            { "id": 62, "row": 7, "code": "G2", "status": "available" },
            { "id": 63, "row": 7, "code": "G3", "status": "available" },
            { "id": 64, "row": 7, "code": "G4", "status": "available" },
            { "id": 65, "row": 7, "code": "G5", "status": "available" },
            { "id": 66, "row": 7, "code": "G6", "status": "available" },
            { "id": 67, "row": 7, "code": "G7", "status": "available" },
            { "id": 68, "row": 7, "code": "G8", "status": "available" },
            { "id": 69, "row": 7, "code": "G9", "status": "available" },
            { "id": 70, "row": 7, "code": "G10", "status": "available" },

            { "id": 71, "row": 8, "code": "H1", "status": "available" },
            { "id": 72, "row": 8, "code": "H2", "status": "available" },
            { "id": 73, "row": 8, "code": "H3", "status": "available" },
            { "id": 74, "row": 8, "code": "H4", "status": "available" },
            { "id": 75, "row": 8, "code": "H5", "status": "available" },
            { "id": 76, "row": 8, "code": "H6", "status": "available" },
            { "id": 77, "row": 8, "code": "H7", "status": "available" },
            { "id": 78, "row": 8, "code": "H8", "status": "available" },
            { "id": 79, "row": 8, "code": "H9", "status": "available" },
            { "id": 80, "row": 8, "code": "H10", "status": "available" },

            { "id": 81, "row": 9, "code": "I1", "status": "available" },
            { "id": 82, "row": 9, "code": "I2", "status": "available" },
            { "id": 83, "row": 9, "code": "I3", "status": "available" },
            { "id": 84, "row": 9, "code": "I4", "status": "available" },
            { "id": 85, "row": 9, "code": "I5", "status": "available" },
            { "id": 86, "row": 9, "code": "I6", "status": "available" },
            { "id": 87, "row": 9, "code": "I7", "status": "available" },
            { "id": 88, "row": 9, "code": "I8", "status": "available" },
            { "id": 89, "row": 9, "code": "I9", "status": "available" },
            { "id": 90, "row": 9, "code": "I10", "status": "available" },

            { "id": 91, "row": 10, "code": "J1", "status": "available" },
            { "id": 92, "row": 10, "code": "J2", "status": "available" },
            { "id": 93, "row": 10, "code": "J3", "status": "available" },
            { "id": 94, "row": 10, "code": "J4", "status": "available" },
            { "id": 95, "row": 10, "code": "J5", "status": "available" },
            { "id": 96, "row": 10, "code": "J6", "status": "available" },
            { "id": 97, "row": 10, "code": "J7", "status": "available" },
            { "id": 98, "row": 10, "code": "J8", "status": "available" },
            { "id": 99, "row": 10, "code": "J9", "status": "available" },
            { "id": 100, "row": 10, "code": "J10", "status": "available" }
        ]
    }

    const res = await axiosInstance.get(
        baseURL + `/cinemas/${roomId}/room`
    );
    return res.result;
}