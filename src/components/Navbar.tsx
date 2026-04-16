import { Brain, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">MindSkill<span className="gradient-text">AI</span></span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild><Link to="/login">Log In</Link></Button>
          <Button variant="hero" asChild><Link to="/login"><Sparkles className="h-4 w-4" /> Get Started</Link></Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="glass-card border-t border-border/50 p-4 md:hidden">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="ghost" asChild><Link to="/login">Log In</Link></Button>
            <Button variant="hero" asChild><Link to="/login">Get Started</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
}
