import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getMoviesForHomePage = async () => {
    // const res = await axios.get(
    //     baseURL + `/movies/public/homepage`
    // );
    return {
        "nowShowing": [
            {
                id: 1,
                title: "The Dark Knight",
                description:
                    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
                posterPath:
                    "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
                genres: ["Action", "Crime", "Drama"],
            },
            {
                id: 2,
                title: "Inception",
                description:
                    "A thief who steals corporate secrets through the use of dream-sharing technology...",
                posterPath:
                    "https://images.unsplash.com/photo-1485846234645-a62644f84728",
                genres: ["Action", "Sci-Fi"],
            }
        ],
        "upcoming": [
            {
                id: 3,
                title: "Interstellar",
                description: "A team of explorers travel through a wormhole in space...",
                posterPath:
                    "https://images.unsplash.com/photo-1596727147705-61a532a659bd",
                genres: ["Adventure", "Drama", "Sci-Fi"],
            },
            {
                id: 4,
                title: "Pulp Fiction",
                description:
                    "The lives of two mob hitmen, a boxer, a gangster and his wife...",
                posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
                genres: ["Crime", "Drama"],
            },
        ],
        "nowShowingMovieIds": [1, 2]
    }

    return res.result;

};

export const getMovieById = async ({ movieId }) => {
    return {
        "id": 1,
        "title": "The Dark Knight",
        "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
        "posterPath": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
        "genres": ["Action", "Crime", "Drama"],
        "nowShowing": true
    }
    const res = await axios.get(
        baseURL + `/movies/public/${movieId}`
    );
    return res.result;
};

export const getNowShowingMovies = () => {
    return [
        {
            "id": 1,
            "title": "Inception",
            "originalTitle": "Inception",
            "ageRating": "16+",
            "description": "A skilled thief is given a chance at redemption if he can successfully perform inception.",
            "duration": 148,
            "director": "Christopher Nolan",
            "language": "English",
            "genres": [
                { "id": 1, "name": "Action" },
                { "id": 2, "name": "Sci-Fi" },
                { "id": 3, "name": "Thriller" }
            ],
            "status": "NOW_SHOWING",
            "thumbnailUrl": "https://example.com/thumbnails/inception.jpg",
            "releaseDate": "2025-08-01",
            "backdropPath": "https://example.com/backdrops/inception.jpg",
            "posterPath": "https://example.com/posters/inception.jpg"
        },
        {
            "id": 2,
            "title": "The Grand Budapest Hotel",
            "ageRating": "20+",

            "originalTitle": "The Grand Budapest Hotel",
            "description": "A concierge teams up with one of his employees to prove his innocence after he is framed for murder.",
            "duration": 99,
            "director": "Wes Anderson",
            "language": "English",
            "genres": [
                { "id": 4, "name": "Comedy" },
                { "id": 5, "name": "Drama" }
            ],
            "status": "NOW_SHOWING",
            "thumbnailUrl": "https://example.com/thumbnails/grandbudapest.jpg",
            "releaseDate": "2025-07-10",
            "backdropPath": "https://example.com/backdrops/grandbudapest.jpg",
            "posterPath": "https://example.com/posters/grandbudapest.jpg"
        }
    ]
    const res = axios.get(
        baseURL + `/movies/public/now-showing`
    );
    return res.result;
}