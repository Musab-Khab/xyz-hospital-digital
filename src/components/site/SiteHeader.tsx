import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, X, HeartPulse, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/services", label: "Services" },
  { to: "/laboratory", label: "Laboratory" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="hidden md:flex items-center justify-between border-b border-border/40 px-6 py-1.5 text-xs text-muted-foreground">
        <p>Open 24/7 · PMDC &amp; ISO accredited</p>
        <div className="flex items-center gap-4">
          <a href="tel:1122" className="inline-flex items-center gap-1.5 font-medium text-destructive">
            <Phone className="h-3.5 w-3.5" /> Emergency: 1122
          </a>
          <Link to="/patient" className="hover:text-foreground">Patient Portal</Link>
          <Link to="/doctor" className="hover:text-foreground">Doctor Portal</Link>
          <Link to="/admin" className="hover:text-foreground">Admin</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">Pakistan Hospital</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Care, redefined</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login"><LogIn className="mr-1.5 h-4 w-4" /> Login</Link>
          </Button>
          <Button asChild variant="outline" size="sm"><Link to="/doctors">Find a doctor</Link></Button>
          <Button asChild size="sm"><Link to="/appointment">Book appointment</Link></Button>
        </div>
        <button
          className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-1 p-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent data-[status=active]:text-primary">
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1"><Link to="/login" onClick={() => setOpen(false)}>Login</Link></Button>
              <Button asChild size="sm" className="flex-1"><Link to="/appointment" onClick={() => setOpen(false)}>Book</Link></Button>
            </div>
            <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3 text-sm">
              <Link to="/patient" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-accent">Patient Portal</Link>
              <Link to="/doctor" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-accent">Doctor Portal</Link>
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-accent">Admin</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
