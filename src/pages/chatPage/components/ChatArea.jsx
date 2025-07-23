"use client";

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaUsers, FaEllipsisV, FaSmile } from "react-icons/fa";
import { Input } from "../../../components/input";
import { Button } from "../../../components/Button";
import { SidebarTrigger } from "../../../components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu";

const mockMessages = {
  "marvel-fans": [
    {
      id: "1",
      user: "TonyStark",
      message:
        "Just watched the new Spider-Man trailer! The multiverse is getting crazy! 🕷️",
      timestamp: "2:34 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      user: "WebSlinger",
      message:
        "I know right! Can't wait to see how they handle all the different Spider-Men",
      timestamp: "2:35 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      user: "MarvelFan2023",
      message: "The CGI looks incredible. Marvel really stepped up their game",
      timestamp: "2:36 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  "horror-nights": [
    {
      id: "1",
      user: "ScreamQueen",
      message:
        "Anyone else excited for the new horror releases this October? 🎃",
      timestamp: "1:45 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

const groupInfo = {
  "marvel-fans": { name: "Marvel Fans", members: 1247, online: 89 },
  "horror-nights": { name: "Horror Nights", members: 892, online: 34 },
  "classic-cinema": { name: "Classic Cinema", members: 654, online: 23 },
  "romance-lovers": { name: "Romance Lovers", members: 1089, online: 67 },
  "indie-films": { name: "Indie Films", members: 445, online: 12 },
  "action-packed": { name: "Action Packed", members: 1567, online: 156 },
};

export function ChatArea({ activeGroup }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const group = groupInfo[activeGroup] || {
    name: "Loading...",
    members: 0,
    online: 0,
  };

  useEffect(() => {
    setMessages(mockMessages[activeGroup] || []);
  }, [activeGroup]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: "You",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "/placeholder.svg?height=32&width=32",
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-white h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Group not found</h2>
          <p className="text-gray-400">
            Please select another group from the sidebar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen min-h-c w-full bg-gray-900 min-w-0">
      {/* Chat Header */}
      <div>
        <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <SidebarTrigger className="md:hidden text-white hover:bg-gray-800 flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white truncate">
                {group.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaUsers className="h-4 w-4 flex-shrink-0" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>{group.online} online</span>
                </div>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <FaEllipsisV className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                Group Info
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                Mute Notifications
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700">
                Leave Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center min-h-[400px]">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Welcome to {group.name}!
              </h3>
              <p className="text-gray-400 max-w-md px-4">
                Start a conversation about your favorite movies, share
                recommendations, and connect with fellow cinema enthusiasts.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                  msg.user === "You" ? "flex-row-reverse" : ""
                }`}
              >
                <img
                  src={
                    msg.avatar ||
                    "/placeholder.svg?height=32&width=32&query=default-avatar"
                  }
                  alt={`${msg.user} avatar`}
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=32&width=32";
                  }}
                />
                <div
                  className={`flex flex-col min-w-0 max-w-[70%] ${
                    msg.user === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-300 truncate">
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`
                    px-4 py-2 rounded-2xl transition-all duration-200 hover:shadow-lg break-words
                    ${
                      msg.user === "You"
                        ? "bg-red-600 text-white rounded-br-md"
                        : "bg-gray-800 text-gray-100 rounded-bl-md hover:bg-gray-750"
                    }
                  `}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <footer className="p-4 border-t border-gray-800 bg-gray-900 flex-shrink-0">
        <div className="flex items-center gap-3 max-w-full">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            <FaSmile className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${group.name}...`}
              className="
                bg-gray-800 border-gray-700 text-white placeholder-gray-400 
                focus:border-red-500 focus:ring-red-500 rounded-full w-full
                transition-all duration-200 hover:bg-gray-750
              "
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="
              bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2
              transition-all duration-200 transform hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              flex-shrink-0
            "
          >
            <FaPaperPlane className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}

ChatArea.propTypes = {
  activeGroup: PropTypes.string.isRequired,
};
