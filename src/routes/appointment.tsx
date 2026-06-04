import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Clock, Stethoscope, User, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { departments, doctors } from "@/lib/mock-data";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book an appointment — Pakistan Hospital" },
      { name: "description", content: "Schedule with a specialist in under a minute." },
    ],
  }),
  component: AppointmentPage,
});

const slots = ["09:00", "09:30", "10:00", "10:30", "11:15", "14:00", "14:30", "15:15", "16:00"];

function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [dept, setDept] = useState<string | null>(null);
  const [doc, setDoc] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const filteredDoctors = useMemo(() => doctors.filter((d) => !dept || d.departmentSlug === dept), [dept]);
  const department = departments.find((x) => x.slug === dept);
  const doctor = doctors.find((d) => d.id === doc);

  const canNext = (step === 1 && dept) || (step === 2 && doc) || (step === 3 && date && time) || (step === 4 && name && phone);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Badge variant="secondary" className="border border-border bg-background"><Sparkles className="mr-1.5 h-3 w-3 text-primary" /> Online appointments</Badge>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">Book your visit</h1>
          <p className="mt-2 text-muted-foreground">Four quick steps. No phone calls.</p>
          <Stepper step={step} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {step === 1 && (
              <div>
                <SectionTitle icon={<Stethoscope className="h-5 w-5" />} title="Select a department" />
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.map((d) => (
                    <button key={d.slug} onClick={() => setDept(d.slug)} className={`rounded-xl border p-4 text-left transition ${dept === d.slug ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border bg-card hover:border-primary/40"}`}>
                      <div className="font-semibold">{d.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{d.tagline}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <SectionTitle icon={<User className="h-5 w-5" />} title="Choose your doctor" sub={department?.name} />
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {filteredDoctors.map((d) => (
                    <button key={d.id} onClick={() => setDoc(d.id)} className={`rounded-xl border p-4 text-left transition ${doc === d.id ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border bg-card hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold">{d.name}</div>
                          <div className="text-xs text-primary">{d.specialty}</div>
                        </div>
                        <Badge variant="secondary" className="border border-border">{d.experience} yrs</Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">{d.availability.join(" · ")}</div>
                    </button>
                  ))}
                  {filteredDoctors.length === 0 && <p className="text-sm text-muted-foreground">No doctors in this department.</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                <Card className="border-border"><CardContent className="p-3">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().toDateString())} className="pointer-events-auto" />
                </CardContent></Card>
                <div>
                  <SectionTitle icon={<Clock className="h-5 w-5" />} title="Choose a time" sub={date ? format(date, "EEEE, MMMM d") : "Pick a date first"} />
                  <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {slots.map((s) => (
                      <button key={s} disabled={!date} onClick={() => setTime(s)} className={`rounded-md border px-3 py-2 text-sm font-medium transition disabled:opacity-40 ${time === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <SectionTitle icon={<User className="h-5 w-5" />} title="Patient details" />
                  <div className="mt-5 grid gap-4">
                    <div className="grid gap-1.5"><Label htmlFor="name">Full name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" /></div>
                    <div className="grid gap-1.5"><Label htmlFor="phone">Phone</Label><Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 010 0000" /></div>
                    <div className="grid gap-1.5"><Label htmlFor="reason">Reason for visit (optional)</Label><Input id="reason" placeholder="Brief description" /></div>
                  </div>
                </div>
                <Card className="border-border bg-secondary/30"><CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold">Review your booking</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <Row label="Department" value={department?.name ?? "—"} />
                    <Row label="Doctor" value={doctor?.name ?? "—"} />
                    <Row label="Date" value={date ? format(date, "EEE, MMM d, yyyy") : "—"} />
                    <Row label="Time" value={time ?? "—"} />
                    <Row label="Mode" value="In-person, Main campus" />
                  </dl>
                </CardContent></Card>
              </div>
            )}

            {step === 5 && (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center px-6 py-14 text-center">
                  <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.div>
                  <h2 className="mt-6 font-display text-2xl font-bold">Appointment confirmed!</h2>
                  <p className="mt-2 max-w-md text-muted-foreground">A confirmation has been sent to {phone}. Reference #XYZ-{Math.floor(100000 + Math.random() * 900000)}.</p>
                  <div className="mt-6 grid gap-2 rounded-xl border border-border bg-secondary/40 px-6 py-4 text-sm">
                    <Row label="Doctor" value={doctor?.name ?? ""} />
                    <Row label="When" value={`${date ? format(date, "EEE, MMM d") : ""} · ${time}`} />
                    <Row label="Where" value="Main campus, 1200 Wellness Ave" />
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Button asChild><Link to="/patient">View in patient portal</Link></Button>
                    <Button asChild variant="outline"><Link to="/">Back to home</Link></Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 5 && (
          <div className="mt-10 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="gap-1">
              {step === 4 ? "Confirm booking" : "Continue"} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Department", "Doctor", "Date & Time", "Details", "Confirmed"];
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "current" : "upcoming";
        return (
          <li key={l} className="flex items-center gap-2">
            <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${state === "done" ? "bg-primary text-primary-foreground" : state === "current" ? "bg-primary/15 text-primary ring-2 ring-primary/40" : "bg-secondary text-muted-foreground"}`}>{n}</div>
            <span className={`text-sm ${state === "current" ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{l}</span>
            {i < labels.length - 1 && <span className="mx-1 h-px w-6 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}

function SectionTitle({ icon, title, sub }: { icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
