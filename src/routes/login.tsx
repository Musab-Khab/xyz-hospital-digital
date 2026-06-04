import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, Mail, Lock, Eye, EyeOff, ShieldCheck, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Pakistan Hospital" },
      { name: "description", content: "Sign in to access your Pakistan Hospital patient, doctor, or admin portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

type Role = "patient" | "doctor" | "admin";

const demo: Record<Role, { email: string; password: string; route: "/patient" | "/doctor" | "/admin"; label: string }> = {
  patient: { email: "sarah.williams@example.com", password: "patient123", route: "/patient", label: "Patient" },
  doctor:  { email: "dr.ahmed@pakistanhospital.pk", password: "doctor123",  route: "/doctor",  label: "Doctor" },
  admin:   { email: "admin@pakistanhospital.pk",    password: "admin123",   route: "/admin",   label: "Admin" },
};

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const d = demo[role];
    setTimeout(() => {
      setLoading(false);
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      try {
        if (remember) localStorage.setItem("ph_session", JSON.stringify({ role, email }));
      } catch {}
      toast.success(`Welcome back, signed in as ${d.label}`);
      navigate({ to: d.route });
    }, 700);
  };

  const fillDemo = () => {
    const d = demo[role];
    setEmail(d.email);
    setPassword(d.password);
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary to-orange-600 p-12 text-primary-foreground">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15 backdrop-blur">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">Pakistan Hospital</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">Care, redefined</div>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Your health, securely connected.
          </h1>
          <p className="text-white/85">
            Access medical records, book appointments, view lab reports, and chat with specialists — all in one secure portal.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> Bank-grade security &amp; HIPAA-aligned privacy</li>
            <li className="flex items-center gap-3"><Stethoscope className="h-4 w-4" /> 320+ specialists across 28 departments</li>
            <li className="flex items-center gap-3"><HeartPulse className="h-4 w-4" /> Trusted by 1.2M+ patients since 1984</li>
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/70">© 2026 Pakistan Hospital · Developed by Muhammad Musab</p>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Pakistan Hospital</span>
          </Link>

          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Welcome back. Choose your portal and sign in to continue.
            </p>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patient"><User className="mr-1.5 h-3.5 w-3.5" />Patient</TabsTrigger>
              <TabsTrigger value="doctor"><Stethoscope className="mr-1.5 h-3.5 w-3.5" />Doctor</TabsTrigger>
              <TabsTrigger value="admin"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />Admin</TabsTrigger>
            </TabsList>

            {(Object.keys(demo) as Role[]).map((r) => (
              <TabsContent key={r} value={r} className="mt-4">
                <Card className="border-border/70">
                  <CardContent className="p-4 text-xs text-muted-foreground">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Demo credentials</p>
                        <p className="mt-0.5">Email: <span className="font-mono text-foreground">{demo[r].email}</span></p>
                        <p>Password: <span className="font-mono text-foreground">{demo[r].password}</span></p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={fillDemo}>Use demo</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={() => toast.info("Password reset link sent to your email.")}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                Remember me
              </label>
              <span className="text-xs text-muted-foreground">Secure SSL connection</span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : `Sign in as ${demo[role].label}`}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              New patient?{" "}
              <Link to="/add-patient" className="font-medium text-primary hover:underline">Register here</Link>
            </p>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By signing in you agree to our Terms &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
