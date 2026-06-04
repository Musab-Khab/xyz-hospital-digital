import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Bell, Search, HeartPulse, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type NavItem = { to: string; label: string; icon: ReactNode };

export function PortalLayout({
  title,
  user,
  role,
  nav,
  children,
}: {
  title: string;
  user: { name: string; initials: string; sub: string };
  role: "Patient" | "Doctor" | "Admin";
  nav: NavItem[];
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-dvh bg-secondary/30">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <Link to="/" className="flex items-center gap-2 border-b border-sidebar-border px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold">Pakistan Hospital</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {role} portal
            </div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"}`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-background/70 text-current shadow-sm">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.sub}</div>
            </div>
            <button
              aria-label="Sign out"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/"
            className="mt-2 block rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-medium text-foreground hover:bg-accent"
          >
            Back to website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="truncate font-display text-lg font-semibold md:text-xl">{title}</h1>
            <Badge variant="secondary" className="hidden md:inline-flex">
              {role}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search patients, records, drugs…" className="w-64 pl-8" />
            </div>
            <button
              className="relative grid h-9 w-9 place-items-center rounded-md border border-border bg-background hover:bg-accent"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <Avatar className="h-9 w-9 lg:hidden">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <nav className="lg:hidden flex gap-1 overflow-x-auto border-b border-border bg-background px-3 py-2">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
