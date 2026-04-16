import DashboardLayout from "@/components/DashboardLayout";
import { MessageCircle, Users, Hash, Send, ThumbsUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const channels = [
  { name: "general", members: 1240, active: true },
  { name: "react-help", members: 856, active: true },
  { name: "career-advice", members: 623, active: false },
  { name: "study-buddies", members: 412, active: true },
  { name: "show-and-tell", members: 298, active: false },
];

const messages = [
  { user: "Sarah M.", avatar: "SM", text: "Just passed my React certification! The adaptive learning really helped me focus on my weak areas 🎉", time: "2m ago", likes: 12 },
  { user: "James R.", avatar: "JR", text: "Has anyone tried the new System Design module? The difficulty adjustment is amazing.", time: "15m ago", likes: 8 },
  { user: "Priya P.", avatar: "PP", text: "The burnout detection saved me last week — I was pushing too hard and didn't even realize.", time: "1h ago", likes: 24 },
  { user: "Alex K.", avatar: "AK", text: "Looking for a study partner for TypeScript fundamentals. Anyone interested?", time: "2h ago", likes: 5 },
];

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Community Hub</h1>
            <p className="text-muted-foreground mt-1">Connect, share, and learn together.</p>
          </div>
          <Button variant="hero" size="sm"><Plus className="h-4 w-4" /> New Post</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Channels */}
          <div className="glass-card rounded-2xl p-4 lg:col-span-1">
            <h3 className="font-display font-bold text-sm mb-3">Channels</h3>
            <div className="space-y-1">
              {channels.map((c) => (
                <button key={c.name} className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-left transition-all ${c.name === "general" ? "gradient-bg text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                  <Hash className="h-3.5 w-3.5" />
                  <span className="flex-1">{c.name}</span>
                  {c.active && <span className="h-1.5 w-1.5 rounded-full bg-chart-green" />}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="lg:col-span-3 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground shrink-0">{m.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{m.user}</span>
                      <span className="text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-3.5 w-3.5" /> {m.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-3.5 w-3.5" /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Message Input */}
            <div className="glass-card rounded-2xl p-3 flex items-center gap-3">
              <input placeholder="Write a message..." className="flex-1 bg-transparent text-sm outline-none px-2" />
              <Button variant="hero" size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
