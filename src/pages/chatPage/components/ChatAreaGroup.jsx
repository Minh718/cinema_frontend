import React, { useEffect, useState } from "react";
import { getGroupMessages } from "../../../api/messaging";
import { ChatArea } from "./ChatArea";
import { TypeChatBox } from "../../../constants/TypeChatBox";
import sockjs from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { API_URL } from "../../../constants/baseURL";
export default function ChatAreaGroup({ chatBox, size, setSize }) {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!token || !chatBox?.id) return;

    console.log("Connected to STOMP");
    const socket = new sockjs(
      `${API_URL}/ws/messaging/messaging-ws?token=${token}`
    );
    const client = Stomp.over(socket);

    let subscription;

    client.connect({}, () => {
      subscription = client.subscribe(`/topic/groups/${chatBox.id}`, (msg) => {
        const message = JSON.parse(msg.body);
        setMessages((prevMessages) => [...prevMessages, message]);
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

  const handleSendGroupMessage = (data) => {
    if (stompClient) {
      stompClient.send("/app/group", {}, JSON.stringify(data));
    }
  };
  useEffect(() => {
    const fetchGroupMessages = async () => {
      try {
        const data = await getGroupMessages({
          id: chatBox.id,
          size,
        });
        setMessages(data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupMessages();
  }, [chatBox.id, size]);
  console.log(size);
  return (
    <ChatArea
      messages={messages}
      chatBox={chatBox}
      type={TypeChatBox.GROUP}
      setSize={setSize}
      size={size}
      handleSendMessage={handleSendGroupMessage}
    />
  );
}
