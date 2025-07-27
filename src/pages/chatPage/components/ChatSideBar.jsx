import PropTypes from "prop-types";
import React from "react";
import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "../../../components/sidebar";
import ListChatBoxCinema from "./ListChatBoxCinema";
import ListChatBoxPrivate from "./ListChatBoxPrivate";

export function CinemaSidebar({ activeChatBox, setActiveChatBox }) {
  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className="border-r border-gray-800 bg-gray-900"
    >
      <SidebarHeader className="border-b border-gray-800 p-4 bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
            <FaFilm className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">CinemaChat</h1>
            <p className="text-sm text-gray-400">Connect with movie lovers</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900 overflow-y-auto flex  items-center">
        <ListChatBoxCinema
          activeChatBox={activeChatBox}
          setActiveChatBox={setActiveChatBox}
        />
        <ListChatBoxPrivate
          activeChatBox={activeChatBox}
          setActiveChatBox={setActiveChatBox}
        />
        <Link to={"/"} className="pb-4 mt-auto">
          <span className="text-sm text-gray-300 font-semibold px-2 py-2 border-2 hover:border-red-600 rounded-lg">
            Go back!
          </span>
        </Link>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

CinemaSidebar.propTypes = {
  activeGroup: PropTypes.string.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
};
