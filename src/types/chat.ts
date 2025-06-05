export type Chat = {
    id: string;
    name: string;
    type: "human" | "ai";
    lastMessage: string;
    unread: boolean;
    unreadCount: number;

  };