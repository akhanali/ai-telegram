
interface MessageBubbleProps {
  id: string;
  content: string;
  isSender: boolean;
  isAI: boolean;
  timestamp: number;
}

export default function MessageBubble({
  content,
  isSender,
  isAI,
  timestamp,
}: MessageBubbleProps) {
  const label = isSender ? "You" : isAI ? "AI" : "Them";
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className="max-w-2/3 p-2 rounded-2xl"
        style={{
          backgroundColor: isSender
            ? "var(--message-out)"
            : "var(--message-in)",
          color: isSender ? "var(--text-secondary)" : "var(--text-primary)",
        }}
      >
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 text-right${
            isSender ? "text-white/80" : "text-gray-500"
          }`}
        >
          {label} •{" "}
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
