import PropTypes from "prop-types";
import {
  FaFilm,
  FaUsers,
  FaStar,
  FaBolt,
  FaHeart,
  FaSkull,
} from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../../components/sidebar";
import { Badge } from "../../../components/Badge";
import React from "react";
import { Link } from "react-router-dom";

const cinemaGroups = [
  {
    id: "marvel-fans",
    name: "Marvel Fans",
    icon: FaBolt,
    members: 1247,
    online: 89,
    category: "Superhero",
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    id: "horror-nights",
    name: "Horror Nights",
    icon: FaSkull,
    members: 892,
    online: 34,
    category: "Horror",
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: "classic-cinema",
    name: "Classic Cinema",
    icon: FaStar,
    members: 654,
    online: 23,
    category: "Classic",
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    id: "romance-lovers",
    name: "Romance Lovers",
    icon: FaHeart,
    members: 1089,
    online: 67,
    category: "Romance",
    color: "bg-pink-600 hover:bg-pink-700",
  },
  {
    id: "indie-films",
    name: "Indie Films",
    icon: FaFilm,
    members: 445,
    online: 12,
    category: "Independent",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "action-packed",
    name: "Action Packed",
    icon: FaBolt,
    members: 1567,
    online: 156,
    category: "Action",
    color: "bg-orange-600 hover:bg-orange-700",
  },
];

export function CinemaSidebar({ activeGroup, onGroupSelect }) {
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

      <SidebarContent className="bg-gray-900 overflow-y-auto flex justify-between items-center">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 font-semibold px-2 py-2">
            Cinema Groups
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {cinemaGroups.map((group) => {
                const Icon = group.icon;
                const isActive = activeGroup === group.id;

                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuButton
                      onClick={() => onGroupSelect(group.id)}
                      isActive={isActive}
                      className={`
                        group relative p-6 rounded-lg transition-all duration-200 ease-in-out w-full
                        ${
                          isActive
                            ? "bg-red-600 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 w-full min-w-0">
                        <div
                          className={`
                          flex h-8 w-8 items-center justify-center rounded-md transition-colors flex-shrink-0
                          ${
                            isActive
                              ? "bg-red-700"
                              : "bg-gray-700 group-hover:bg-gray-600"
                          }
                        `}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">
                              {group.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`
                                ml-2 text-xs transition-colors flex-shrink-0
                                ${
                                  isActive
                                    ? "bg-red-700 text-red-100"
                                    : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"
                                }
                              `}
                            >
                              {group.online}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaUsers className="h-3 w-3 opacity-60 flex-shrink-0" />
                            <span className="text-xs opacity-60 truncate">
                              {group.members} members
                            </span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Link to={"/"} className="pb-4">
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
