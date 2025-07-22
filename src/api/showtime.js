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
    return {
        "dubShows": [
            {
                "id": 101,
                "startTime": "10:00",
                "endTime": "12:00"
            },
            {
                "id": 102,
                "startTime": "14:00",
                "endTime": "16:00"
            }
        ],
        "subShows": [
            {
                "id": 103,
                "startTime": "17:15",
                "endTime": "19:15"
            },
            {
                "id": 104,
                "startTime": "20:00",
                "endTime": "22:00"
            }
        ]
    }
};

export const getBookableDetailShowTime = async (showtimeId) => {
    return {
        id: 2,
        "date": "2025-07-25",
        "startTime": "14:00",
        "endTime": "16:15",
        "screenType": "IMAX",
        "language": "English",
        "subtitle": "Vietnamese",
        "basePrice": 120,
        "movieId": 101,
        "roomId": 12,
        "cinemaId": 5
    }
    const res = await axios.get(
        baseURL + `/showtimes/${showtimeId}/bookable`
    );
    return res.result;
}


export const getShowTimeGroupsByTypeInDate = async (data) => {
    return [{
        "id": 11,
        "language": "English",
        "subtitle": "Vietnamese",
        "basePrice": 120,
        "movieId": 1,
        "roomId": 5,
        "cinemaId": 3,
        "type": "SUBTITLE",

        "showTimes": [
            {
                "id": 101,
                "startTime": "14:00",
                "endTime": "16:00"
            },
            {
                "id": 102,
                "startTime": "10:00",
                "endTime": "12:00"

            }
        ],
    },
    {
        "id": 12,
        "language": "English",
        "subtitle": "Vietnamese",
        "basePrice": 120,
        "movieId": 1,
        "roomId": 5,
        "cinemaId": 3,
        "type": "DUBBED",
        "showTimes": [
            {
                "id": 201,
                "startTime": "18:00",
                "endTime": "20:00"

            }, {
                "id": 201,
                "startTime": "20:00",
                "endTime": "22:00"

            }
        ]
    },
    ]
    const res = await axios.get(
        baseURL + `/showtimes/showtimegroups`, {
        params: data
    }
    );
    return res.result;
}
