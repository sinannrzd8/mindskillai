import { Brain, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navItems = [
  { label: "navigation.features", href: "#features" },
  { label: "navigation.howItWorks", href: "#how-it-works" },
  { label: "navigation.pricing", href: "/pricing" },
  { label: "navigation.about", href: "/about" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
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
                {t(item.label)}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {t(item.label)}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button variant="ghost" asChild><Link to="/login">{t("navigation.logIn")}</Link></Button>
          <Button variant="hero" asChild><Link to="/login"><Sparkles className="h-4 w-4" /> {t("navigation.getStarted")}</Link></Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="glass-card border-t border-border p-4 md:hidden">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
              {t(item.label)}
            </a>
          ))}
          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">{t("navigation.language")}</p>
            <div className="mb-3">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="ghost" asChild><Link to="/login">{t("navigation.logIn")}</Link></Button>
            <Button variant="hero" asChild><Link to="/login">{t("navigation.getStarted")}</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
}
