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