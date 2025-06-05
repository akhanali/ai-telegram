import MessageBubble from "./MessageBubble";
import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/message";
import { useForm } from "react-hook-form";
import { contacts } from "../data/contacts";
import { generateAIResponse } from "../ai/ai";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export default function ChatWindow({ chatId }: { chatId: string }) {
  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const currentChat = contacts.find((chat) => chat.id === chatId);
  const chatName = currentChat?.name || "Unknown";
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["chatHistory", chatId],
    queryFn: () => {
      const saved = localStorage.getItem(`chatHistory-${chatId}`);
      return saved ? JSON.parse(saved) : [];
    },
  });
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const onSubmit = async (data: { content: string }) => {
    if (!data.content.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: data.content,
      isSender: true,
      isAI: false,
      timestamp: Date.now(),
    };

    const prevMessages =
      queryClient.getQueryData<Message[]>(["chatHistory", chatId]) || [];

    const updatedMessages = [...prevMessages, newMessage];
    localStorage.setItem(
      `chatHistory-${chatId}`,
      JSON.stringify(updatedMessages)
    );

    queryClient.setQueryData(["chatHistory", chatId], updatedMessages);
    reset();
    const isAIChat = contacts.find((c) => c.id === chatId)?.type === "ai";
    if (!isAIChat) return;
    setIsTyping(true);
    const aiReplyText = await generateAIResponse(data.content);
    setIsTyping(false);
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      content: aiReplyText,
      isSender: false,
      isAI: true,
      timestamp: Date.now(),
    };
    const finalMessages = [...updatedMessages, aiMessage];

    localStorage.setItem(
      `chatHistory-${chatId}`,
      JSON.stringify(finalMessages)
    );
    queryClient.setQueryData(["chatHistory", chatId], finalMessages);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex-1">
          <p
            className="text-lg font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {chatName}
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Online
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 justify-start mt-2">
            <div
              className="flex items-center gap-1 px-3 py-2 rounded-2xl"
              style={{
                backgroundColor: "var(--message-in)",
                color: "var(--text-secondary)",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-gray-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-gray-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-gray-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex gap-2 border-t"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <input
          {...register("content")}
          className="flex-1 border rounded p-2"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            borderColor: "var(--border-color)",
          }}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: "var(--primary-blue)",
            color: "white",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
