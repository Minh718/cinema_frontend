import { useState } from "react";
import { SidebarProvider } from "../../components/sidebar";
import React from "react";
import { ChatArea } from "./components/ChatArea";
import { CinemaSidebar } from "./components/ChatSideBar";

export default function CinemaChatPage() {
  const [activeGroup, setActiveGroup] = useState("marvel-fans");

  return (
    <div className="h-screen w-full bg-gray-900 overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full relative">
          <CinemaSidebar
            activeGroup={activeGroup}
            onGroupSelect={setActiveGroup}
          />
          <main className="md:pl-64 flex-1 flex flex-col h-full overflow-hidden">
            <ChatArea activeGroup={activeGroup} />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
