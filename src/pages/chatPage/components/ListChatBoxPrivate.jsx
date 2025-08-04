import React, { useEffect, useState } from "react";
import { getAllPrivateChatBoxesForUser } from "../../../api/messaging";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../../../components/sidebar";
import { TypeChatBox } from "../../../constants/TypeChatBox";
import { API_URL } from "../../../constants/baseURL";
import { Stomp } from "@stomp/stompjs";
import sockjs from "sockjs-client/dist/sockjs";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../components/LoadingComponent";
import { FaUsers } from "react-icons/fa";
export default function ListChatBoxPrivate({
  activeChatBox,
  setActiveChatBox,
}) {
  const [chatBoxes, setChatBoxes] = useState([]);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) return;

    const socket = new sockjs(
      `${API_URL}/ws/messaging/messaging-ws?token=${token}`
    );
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/user/specific/chat-notification", (msg) => {
        const { message, id: friendId } = JSON.parse(msg.body);

        setChatBoxes((prevChatBoxes) =>
          prevChatBoxes.map((chatBox) => {
            if (chatBox.id !== friendId) return chatBox;

            const prevNotification = chatBox.notification || {
              previewMessage: "",
              unreadCount: 0,
            };

            return {
              ...chatBox,
              notification: {
                previewMessage: message,
                unreadCount: prevNotification.unreadCount + 1,
              },
            };
          })
        );
      });
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from STOMP");
        });
      }
    };
  }, [token]);
  const handleConvertChatBox = (chatBox) => {
    setActiveChatBox({ data: chatBox, type: TypeChatBox.PRIVATE });
    if (chatBox.notification) {
      setChatBoxes((prevChatBoxes) =>
        prevChatBoxes.map((chatBox) => {
          if (chatBox.id !== chatBox.id) return chatBox;
          return {
            ...chatBox,
            notification: null,
          };
        })
      );
    }
  };
  useEffect(() => {
    const fetchPrivateChatBoxes = async () => {
      try {
        const res = await getAllPrivateChatBoxesForUser();
        setChatBoxes(res);
      } catch (err) {
        console.error("Failed to fetch private chat boxes:", err);
      }
    };
    fetchPrivateChatBoxes();
  }, []);
  if (chatBoxes.length === 0) return <LoadingComponent />;
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-gray-300 font-semibold px-2 py-2">
        Private Chats
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chatBoxes.map((chatBox) => (
            <SidebarMenuItem key={chatBox.id}>
              <div
                onClick={() => handleConvertChatBox(chatBox)}
                className={`group relative p-1 rounded-lg transition-all duration-200 ease-in-out w-full cursor-pointer ${
                  activeChatBox.data.id === chatBox.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 w-full min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md overflow-hidden flex-shrink-0 transition-colors">
                    <img
                      src={chatBox.avatar}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">
                        {chatBox.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`h-2 w-2 ${
                          chatBox.online ? "bg-green-500" : "bg-gray-500"
                        } rounded-full flex-shrink-0`}
                      ></div>
                      <span className="text-xs opacity-60 truncate">
                        {chatBox.online ? "Online" : "Offline"}
                      </span>
                    </div>
                    {chatBox.notification && (
                      <div>
                        <span className="text-xs font-bold truncate">
                          {chatBox.name}: {chatBox.notification.previewMessage}
                        </span>
                      </div>
                    )}
                  </div>
                  {chatBox.notification && (
                    <div className="ml-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                      {chatBox.notification.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
