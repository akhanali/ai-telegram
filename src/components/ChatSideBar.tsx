import { useEffect, useState } from "react";
import type { Chat } from "../types/chat";
import { useNavigate, useParams } from "react-router-dom";
import { contacts as baseChats } from "../data/contacts";

export default function ChatSideBar() {
  const [chats, setChats] = useState<Chat[]>(baseChats);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );
  const { chatId } = useParams();

  const humanChats = filteredChats.filter((chat) => chat.type === "human");
  const aiChats = filteredChats.filter((chat) => chat.type === "ai");

  useEffect(() => {
    const updated = baseChats.map((chat) => {
      const raw = localStorage.getItem(`chatHistory-${chat.id}`);
      if (!raw) return chat;

      const messages = JSON.parse(raw);
      const last = messages[messages.length - 1];
      const unreadCount = messages.filter(
        (m: any) => !m.isSender && !m.read
      ).length;

      return {
        ...chat,
        lastMessage: last?.content || "",
        unreadCount,
      };
    });
    setChats(updated);
  }, []);

  return (
    <div
      className="w-full md:w-80 flex-shrink-0 flex flex-col border-r"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 m-2 border rounded-md"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-primary)",
        }}
      />
      {aiChats.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-500 px-2 mt-4">
            AI-assistants
          </p>
          {aiChats.map((chat) => {
            const isActive = chat.id === chatId; 
            return (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="flex items-center gap-2 cursor-pointer rounded-md p-2"
                style={{
                  backgroundColor: isActive ? "var(--light-blue)" : "transparent", 
                  color: isActive ? "white" : "var(--text-primary)",
                }}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{chat.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">
                      {chat.lastMessage}
                    </div>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 ml-2">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
      {humanChats.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-500 px-2">People</p>
          {humanChats.map((chat) => {
            const isActive = chat.id === chatId; 
            return (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="flex items-center gap-2 cursor-pointer rounded-md p-2"
                style={{
                  backgroundColor: isActive ? "var(--light-blue)" : "transparent",
                  color: isActive ? "white" : "var(--text-primary)",
                }}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{chat.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">
                      {chat.lastMessage}
                    </div>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 ml-2">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
