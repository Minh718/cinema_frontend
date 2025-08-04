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
        },
        {
            "id": "1a2b3c4d-5678-90ef-gh12-345678901234",
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

export const getGroupMessages = async (data) => {
    return [
        {
            "id": "1",
            "message": "Hey team, the meeting starts in 10 minutes.",
            "sender": "1a2b3c4d-5678-90ef-gh12-345678901234",
            "name": "Alice Johnson",
            "avatar": "https://example.com/avatars/alice.jpg",
            "createdAt": "2025-08-02T08:30:00"
        },
        {
            "id": "2",
            "message": "Thanks for the reminder!",
            "sender": "bob",
            "name": "Bob Smith",
            "avatar": "https://example.com/avatars/bob.png",
            "createdAt": "2025-08-02T08:31:12"
        },
        {
            "id": "3",
            "message": "I'm joining now.",
            "sender": "carol",
            "name": "Carol Nguyen",
            "avatar": "https://example.com/avatars/carol.jpeg",
            "createdAt": "2025-08-02T08:31:50"
        },
        {
            "id": "4",
            "message": "Hey team, the meeting starts in 10 minutes.",
            "sender": "1a2b3c4d-5678-90ef-gh12-345678901234",
            "name": "Alice Johnson",
            "avatar": "https://example.com/avatars/alice.jpg",
            "createdAt": "2025-08-02T08:30:00"
        },
        // {
        //     "id": "5",
        //     "message": "Thanks for the reminder!",
        //     "sender": "bob",
        //     "name": "Bob Smith",
        //     "avatar": "https://example.com/avatars/bob.png",
        //     "createdAt": "2025-08-02T08:31:12"
        // },
        // {
        //     "id": "6",
        //     "message": "I'm joining now.",
        //     "sender": "carol",
        //     "name": "Carol Nguyen",
        //     "avatar": "https://example.com/avatars/carol.jpeg",
        //     "createdAt": "2025-08-02T08:31:50"
        // },
        // {
        //     "id": "7",
        //     "message": "I'm joining now.",
        //     "sender": "carol",
        //     "name": "Carol Nguyen",
        //     "avatar": "https://example.com/avatars/carol.jpeg",
        //     "createdAt": "2025-08-02T08:31:50"
        // },
        // {
        //     "id": "8",
        //     "message": "Hey team, the meeting starts in 10 minutes.",
        //     "sender": "1a2b3c4d-5678-90ef-gh12-345678901234",
        //     "name": "Alice Johnson",
        //     "avatar": "https://example.com/avatars/alice.jpg",
        //     "createdAt": "2025-08-02T08:30:00"
        // },
        // {
        //     "id": "9",
        //     "message": "Thanks for the reminder!",
        //     "sender": "bob",
        //     "name": "Bob Smith",
        //     "avatar": "https://example.com/avatars/bob.png",
        //     "createdAt": "2025-08-02T08:31:12"
        // },
        // {
        //     "id": "10",
        //     "message": "I'm joining now.",
        //     "sender": "carol",
        //     "name": "Carol Nguyen",
        //     "avatar": "https://example.com/avatars/carol.jpeg",
        //     "createdAt": "2025-08-02T08:31:50"
        // }

    ]

    const res = await axiosInstance.get(
        baseURL + `/messaging/group/messages`,
        { params: data }
    );
    return res.result;
}
export const getPrivateMessages = async (data) => {
    return [
        {
            "id": "1",
            "message": "Hey team, the meeting starts in 10 minutes.",
            "sender": "1a2b3c4d-5678-90ef-gh12-345678901234",
            "createdAt": "2025-08-02T08:30:00"
        },
        {
            "id": "2",
            "message": "Thanks for the reminder!",
            "sender": "1a2b3c4d-5678-90ef-gh12-345678901233",
            "createdAt": "2025-08-02T08:31:12"
        },
        {
            "id": "3",
            "message": "I'm joining now.",
            "sender": "1a2b3c4d-5678-90ef-gh12-345678901234",
            "createdAt": "2025-08-02T08:31:50"
        }
    ]

    const res = await axiosInstance.get(
        baseURL + `/messaging/private/messages`,
        { params: data }
    );
    return res.result;
}