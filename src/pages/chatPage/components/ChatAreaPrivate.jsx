import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sockjs from "sockjs-client/dist/sockjs";
import { getPrivateMessages } from "../../../api/messaging";
import { API_URL } from "../../../constants/baseURL";
import { TypeChatBox } from "../../../constants/TypeChatBox";
import { ChatArea } from "./ChatArea";

export default function ChatAreaPrivate({ chatBox, size, setSize }) {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const handleSendPrivateMessage = (data) => {
    if (stompClient) {
      stompClient.send("/app/private", {}, JSON.stringify(data));
    }
  };
  useEffect(() => {
    const fetchPrivateMessages = async () => {
      try {
        const data = await getPrivateMessages({
          friendId: chatBox.id,
          size,
        });
        setMessages(data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrivateMessages();
  }, [chatBox.id, size]);
  useEffect(() => {
    if (!token || !chatBox?.id) return;

    const socket = new sockjs(
      `${API_URL}/ws/messaging/messaging-ws?token=${token}`
    );
    const client = Stomp.over(socket);
    let subscription;

    client.connect({}, () => {
      subscription = client.subscribe("/user/specific/chat", (msg) => {
        const message = JSON.parse(msg.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...message,
            avatar: chatBox.avatar,
            name: chatBox.name,
          },
        ]);
      });

      setStompClient(client);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("Disconnected from STOMP");
        });
      }
    };
  }, [token, chatBox?.id]);
  return (
    <ChatArea
      messages={messages}
      chatBox={chatBox}
      size={size}
      type={TypeChatBox.GROUP}
      setSize={setSize}
      handleSendMessage={handleSendPrivateMessage}
    />
  );
}
