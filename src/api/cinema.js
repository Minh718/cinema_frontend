import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getAllCinemas = async (authCode) => {
    const res = await axios.get(
        baseURL + `/cinemas/public`
    );

    return res.result;

};