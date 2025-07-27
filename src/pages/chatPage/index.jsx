import { useEffect, useState } from "react";
import { SidebarProvider } from "../../components/sidebar";
import React from "react";
import { ChatArea } from "./components/ChatArea";
import { CinemaSidebar } from "./components/ChatSideBar";
import { TypeChatBox } from "../../constants/TypeChatBox";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import ChatAreaGroup from "./components/ChatAreaGroup";
import ChatAreaPrivate from "./components/ChatAreaPrivate";

export default function CinemaChatPage() {
  const { cinemaId, cinemas } = useSelector((state) => state.cinema);

  const [activeChatBox, setActiveChatBox] = useState(null);
  console.log(activeChatBox);
  useEffect(() => {
    if (!cinemas) return;
    const selectedCinema = cinemas.find((c) => c.id === cinemaId);
    setActiveChatBox(() => ({
      data: {
        id: selectedCinema.chatBoxId,
        name: selectedCinema.name,
        avatar: selectedCinema.avatar,
      },
      type: TypeChatBox.GROUP,
    }));
  }, [cinemas]);
  if (!activeChatBox) return <LoadingPage />;

  return (
    <div className="h-screen w-full bg-gray-900 overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full relative">
          <CinemaSidebar
            activeChatBox={activeChatBox}
            setActiveChatBox={setActiveChatBox}
          />
          <main className="md:pl-64 flex-1 flex flex-col h-full overflow-hidden">
            {activeChatBox.type === TypeChatBox.GROUP ? (
              <ChatAreaGroup chatBox={activeChatBox.data} />
            ) : (
              <ChatAreaPrivate chatBox={activeChatBox.data} />
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
