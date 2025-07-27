import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import sockjs from "sockjs-client/dist/sockjs";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/sidebar";
import { API_URL } from "../../../constants/baseURL";
import { TypeChatBox } from "../../../constants/TypeChatBox";
export default function ListChatBoxCinema({ activeChatBox, setActiveChatBox }) {
  const { cinemas } = useSelector((state) => state.cinema);
  const { token } = useSelector((state) => state.auth);
  const [chatBoxes, setChatBoxes] = useState([]);

  useEffect(() => {
    if (cinemas?.length) {
      setChatBoxes(
        cinemas.map((c) => ({
          id: c.chatBoxId,
          name: c.name,
          avatar: c.avatar,
          online: 0,
        }))
      );
    }
  }, [cinemas]);

  useEffect(() => {
    if (!token) return;

    const socket = new sockjs(
      `${API_URL}/ws/messaging/messaging-ws?token=${token}`
    );
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/groups/online", (msg) => {
        const payload = JSON.parse(msg.body); // [{ chatBoxId, online }]
        setChatBoxes((prev) =>
          prev.map((chatBox) => {
            const match = payload.find((g) => g.chatBoxId === chatBox.id);
            return { ...chatBox, online: match?.online || 0 };
          })
        );
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from STOMP");
        });
      }
    };
  }, [token]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-gray-300 font-semibold px-2 py-2">
        Cinema Groups
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chatBoxes.map((chatBox) => (
            <SidebarMenuItem key={chatBox.id}>
              <div
                onClick={() =>
                  setActiveChatBox({ data: chatBox, type: TypeChatBox.GROUP })
                }
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
                      <FaUsers className="h-3 w-3 opacity-60 flex-shrink-0" />
                      <span className="text-xs opacity-60 truncate">
                        {`${chatBox.online} online`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
