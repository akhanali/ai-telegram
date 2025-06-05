import ChatSideBar from "../components/ChatSideBar";
import ChatWindow from "../components/ChatWindow";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function ChatPage() {
  const { chatId } = useParams();
  console.log(chatId);
  return (
    <div className="flex flex-col h-screen">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <ChatSideBar />
        {chatId ? (
          <div className="flex flex-col flex-1 min-w-0">
            <ChatWindow chatId={chatId} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
}
