import DashboardLayout from "@/components/DashboardLayout";
import { User, Bell, Shield, Palette, Globe, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { icon: User, title: "Profile", desc: "Update your name, bio, and career goals." },
  { icon: Bell, title: "Notifications", desc: "Manage email and push notification preferences." },
  { icon: Shield, title: "Privacy & Security", desc: "Two-factor authentication and data controls." },
  { icon: Palette, title: "Appearance", desc: "Theme, font size, and accessibility options." },
  { icon: Globe, title: "Language & Region", desc: "Set your preferred language and timezone." },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg text-2xl font-bold text-primary-foreground">AK</div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg">Alex Kim</h3>
            <p className="text-sm text-muted-foreground">alex.kim@email.com · Frontend Developer Path</p>
          </div>
          <Button variant="hero-outline" size="sm">Edit Profile</Button>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          {sections.map((s) => (
            <button key={s.title} className="w-full glass-card hover-lift rounded-2xl p-5 flex items-center gap-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-destructive/20 p-6">
          <h3 className="text-sm font-semibold text-destructive mb-1">Danger Zone</h3>
          <p className="text-xs text-muted-foreground mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
