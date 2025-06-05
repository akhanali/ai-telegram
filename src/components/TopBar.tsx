import { Menu, Settings, User } from "lucide-react";

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-between px-4 py-2 border-b"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--primary-blue)" }}>
        <Menu className="w-5 h-5 text-[color:var(--primary-blue)]" />
        <span style={{ color: "var(--primary-blue)" }}>Telegram Clone</span>
      </div>
      <div className="flex items-center gap-4">
        <Settings
          className="w-5 h-5 cursor-pointer"
          style={{
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        />
        <User
          className="w-5 h-5 cursor-pointer"
          style={{
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        />
      </div>
    </div>
  );
}
