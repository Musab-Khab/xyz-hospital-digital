import { Link } from "@tanstack/react-router";
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, Code2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><HeartPulse className="h-5 w-5" /></div>
            <div className="font-display text-lg font-bold">Pakistan Hospital</div>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A multi-specialty quaternary care hospital delivering compassionate, evidence-based medicine across Pakistan since 1984.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" /><span>Jail Road, Gulberg-III, Lahore, Punjab, Pakistan</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /><span>+92 42 111-PAK-HOS</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary shrink-0" /><span>care@pakistanhospital.pk</span></li>
          </ul>
        </div>
        <FooterCol title="Care" links={[
          { to: "/departments", label: "Departments" },
          { to: "/doctors", label: "Find a doctor" },
          { to: "/services", label: "Services" },
          { to: "/laboratory", label: "Laboratory" },
          { to: "/appointment", label: "Book appointment" },
        ]} />
        <FooterCol title="Hospital" links={[
          { to: "/about", label: "About us" },
          { to: "/about", label: "Leadership" },
          { to: "/about", label: "Accreditations" },
          { to: "/contact", label: "Contact" },
        ]} />
        <FooterCol title="Portals" links={[
          { to: "/patient", label: "Patient portal" },
          { to: "/doctor", label: "Doctor portal" },
          { to: "/admin", label: "Admin dashboard" },
          { to: "/add-patient", label: "Add patient" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© 2026 Pakistan Hospital. All rights reserved. PMDC · ISO 9001 accredited.</p>
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
            <Code2 className="h-3.5 w-3.5 text-primary" /> Developed by <span className="font-semibold text-primary">Muhammad Musab</span>
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l, i) => (
          <li key={i}><Link to={l.to} className="text-muted-foreground hover:text-primary">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
