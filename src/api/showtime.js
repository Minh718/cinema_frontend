import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getFutureShowDatesByMovieId = async ({ movieId, cinemaId }) => {
    // const res = await axios.get(
    //     baseURL + `/showtimes/dates`, {
    //     params: {
    //         movieId: movieId,
    //         cinemaId: cinemaId
    //     }
    // }
    // );

    // return res.result;

    return [
        "2023-08-01",
        "2023-08-02",
        "2023-08-03",
        "2023-08-04",
        "2023-08-05"
    ]
};
export const getMovieIdsHaveShowtimeByCinemaId = async ({ cinemaId }) => {
    // const res = await axios.get(
    //     baseURL + `/showtimes/now-showing/movie-ids`, {
    //     params: {
    //         cinemaId: cinemaId
    //     }
    // }
    // );
    // return res.result;
    return [1];
}
export const getShowTimesByMovieIdAndDate = async ({ movieId, cinemaId, date }) => {
    // const res = await axios.get(
    //     baseURL + `/showtimes/times`, {
    //     params: {
    //         movieId: movieId,
    //         cinemaId: cinemaId,
    //         date
    //     }
    // }
    // );

    // return res.result;
    return [
        {
            id: 1,
            "date": "2025-07-20",
            "startTime": "14:00:00",
            "endTime": "16:30:00",
            "status": "SCHEDULED",
            "screenType": "IMAX",
            "language": "English",
            "subtitle": "Vietnamese",
            "basePrice": 120000.0,
            "movieId": 101,
            "roomId": 5,
            "cinemaId": 2,
            "createdAt": "2025-07-19T08:00:00",
            "updatedAt": "2025-07-19T09:30:00"
        },
        {
            id: 2,
            "date": "2025-07-20",
            "startTime": "17:00:00",
            "endTime": "19:15:00",
            "status": "SCHEDULED",
            "screenType": "2D",
            "language": "Vietnamese",
            "subtitle": "English",
            "basePrice": 90000.0,
            "movieId": 102,
            "roomId": 3,
            "cinemaId": 2,
            "createdAt": "2025-07-19T10:00:00",
            "updatedAt": "2025-07-19T11:00:00"
        }]
};

export const getShowTimeAvailable = async (showtimeId) => {
    return {
        id: 2,
        "date": "2025-07-25",
        "startTime": "14:00",
        "endTime": "16:15",
        "screenType": "IMAX",
        "language": "English",
        "subtitle": "Vietnamese",
        "basePrice": 120000.0,
        "movieId": 101,
        "roomId": 12,
        "cinemaId": 5
    }
    const res = await axios.get(
        baseURL + `/showtimes/${showtimeId}/bookable`
    );
    return res.result;
}


export const getShowTimesOfMovieInDate = async ({ movieId, date }) => {
    return {
        "language": "English",
        "subtitle": "Vietnamese",
        "basePrice": 120000.0,
        "movieId": 1,
        "roomId": 5,
        "cinemaId": 3,
        "subShows": [
            {
                "id": 101,
                "startTime": "14:00",
                "endTime": "16:00"
                , "basePrice": 120
            },
            {
                "id": 102,
                "startTime": "10:00",
                "endTime": "12:00"
                , "basePrice": 120

            }
        ],
        "dubShows": [
            {
                "id": 201,
                "startTime": "18:00",
                "endTime": "20:00"
                , "basePrice": 120

            }, {
                "id": 201,
                "startTime": "20:00",
                "endTime": "22:00"
                , "basePrice": 120

            }
        ]
    }
    const res = await axios.get(
        baseURL + `/showtimes/${movieId}/showtimes`, {
        params: {
            date: date
        }
    }
    );
    return res.result;
}
