import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const userLoginByGoogle = async (authCode) => {
    const res = await axios.post(
        baseURL + `/auth/signin/google?code=${authCode}`
    );
    return res.result;
};