import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "bot"; text: string };

const canned = [
  {
    q: ["appointment", "book"],
    a: "You can book an appointment from the 'Book appointment' button in the header, or visit /appointment.",
  },
  {
    q: ["emergency", "ambulance"],
    a: "For emergencies call 1122 (Pakistan) or our 24/7 line 042-111-PAK-HOS.",
  },
  {
    q: ["lab", "test", "laboratory"],
    a: "Visit our Laboratory page to view tests & home sample collection — /laboratory.",
  },
  {
    q: ["doctor", "find"],
    a: "Browse 320+ specialists in the Doctors page. Filter by department.",
  },
  { q: ["timing", "hours", "open"], a: "OPD: 8AM–10PM daily. Emergency & ICU: 24/7." },
  {
    q: ["address", "location"],
    a: "Pakistan Hospital, Jail Road, Lahore, Punjab — visible on the Contact page.",
  },
];

function reply(text: string): string {
  const t = text.toLowerCase();
  for (const c of canned) if (c.q.some((k) => t.includes(k))) return c.a;
  return "Thanks for your message! Our care team will get back to you. For urgent help call 1122.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Assalam-o-Alaikum! I'm the Pakistan Hospital assistant. How can I help you today?",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const v = input.trim();
    if (!v) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: v }]);
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply(v) }]), 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[480px] w-[340px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Hospital Assistant</div>
              <div className="text-[10px] opacity-80">Online · Replies instantly</div>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-secondary/40">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border border-border"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex gap-2 border-t border-border bg-background p-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
            />
            <Button size="icon" onClick={send}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
