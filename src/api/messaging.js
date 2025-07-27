import axios from "axios";
import { baseURL } from "../constants/baseURL";
import axiosInstance from "./axiosInstance";

export const trackOnlineUser = async () => {
    return null;
    const res = await axiosInstance.get(
        baseURL + `/messaging/user-online`
    );
    return res.result;
}
export const trackOfflineUser = async () => {
    return null;
    const res = await axiosInstance.get(
        baseURL + `/messaging/user-offline`
    );
    return res.result;
}

export const getAllPrivateChatBoxesForUser = async () => {
    return [
        {
            "id": "user123",
            "name": "Alice Johnson",
            "avatar": "https://example.com/avatars/alice.jpg",
            "online": true,
            "notification": {
                "unreadCount": 2,
                "previewMessage": "Hi, how are you?"
            }
        },
        {
            "id": "user456",
            "name": "Bob Smith",
            "avatar": "https://example.com/avatars/bob.jpg",
            "online": false
        },
        {
            "id": "user789",
            "name": "Charlie Lee",
            "avatar": "https://example.com/avatars/charlie.jpg",
            "online": true
        }
    ];
    const res = await axiosInstance.get(
        baseURL + `/messaging/chatboxs`
    );
    return res.result;
}