import { Brain, Globe, Briefcase, Code } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">MindSkill<span className="gradient-text">AI</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">Learning that understands you. AI-powered adaptive education with emotional intelligence.</p>
            <div className="mt-4 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Certifications", "Mentorship", "Enterprise"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
            { title: "Resources", links: ["Documentation", "Help Center", "Community", "API", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 MindSkill AI. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((t) => (
              <a key={t} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
