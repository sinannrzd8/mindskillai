import { Brain, Globe, Briefcase, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footerColumns = [
    { 
      title: t('footer.product'), 
      links: [
        { label: t('footer.features'), href: '#features' },
        { label: t('footer.pricing'), href: '/pricing' },
        { label: t('footer.certifications'), href: '#' },
        { label: t('footer.mentorship'), href: '#' },
        { label: t('footer.enterprise'), href: '#' },
      ] 
    },
    { 
      title: t('footer.company'), 
      links: [
        { label: t('footer.about'), href: '/about' },
        { label: t('footer.careers'), href: '#' },
        { label: t('footer.blog'), href: '#' },
        { label: t('footer.press'), href: '#' },
        { label: t('footer.contact'), href: '#' },
      ] 
    },
    { 
      title: t('footer.resources'), 
      links: [
        { label: t('footer.documentation'), href: '#' },
        { label: t('footer.helpCenter'), href: '#' },
        { label: t('footer.community'), href: '#' },
        { label: t('footer.api'), href: '#' },
        { label: t('footer.status'), href: '#' },
      ] 
    },
  ];

  const footerLinks = [
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.terms'), href: '#' },
    { label: t('footer.cookies'), href: '#' },
  ];

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
            <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.tagline')}</p>
            <div className="mt-4 flex gap-3">
              {[Globe, Briefcase, Code].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
