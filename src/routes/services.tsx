import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, FlaskConical, Scissors, Microscope, Pill, Video, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Pakistan Hospital" },
      { name: "description", content: "Emergency care, diagnostics, surgery, labs, pharmacy, and telemedicine — under one roof." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 Level 1 trauma center with helipad and rapid response.", points: ["< 8 min triage", "Dedicated stroke & STEMI alert", "Pediatric emergency"] },
  { icon: Microscope, title: "Diagnostic Services", desc: "Advanced imaging and same-day reports for most studies.", points: ["3T MRI · 256-slice CT", "PET-CT & nuclear medicine", "Interventional radiology"] },
  { icon: Scissors, title: "Surgery", desc: "Minimally invasive, robotic, and complex open surgery.", points: ["12 hybrid ORs", "Robotic surgery program", "Same-day discharge options"] },
  { icon: FlaskConical, title: "Laboratory", desc: "NABL-accredited central lab serving inpatient and outpatient needs.", points: ["1,400+ tests on menu", "Stat turnaround in 60 min", "Home sample collection"] },
  { icon: Pill, title: "Pharmacy", desc: "24/7 in-house pharmacy with home delivery within the city.", points: ["E-prescription pickup", "Insurance billing", "Medication counselling"] },
  { icon: Video, title: "Telemedicine", desc: "Video visits with specialists from anywhere.", points: ["Secure video", "E-prescriptions", "Follow-ups within 24h"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Badge variant="secondary" className="border border-border bg-background">Services</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Every service your care plan needs</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">A unified clinical platform that connects emergency, diagnostics, surgery, pharmacy, and follow-up care.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="border-border transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <CardContent className="p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-6 w-6" /></div>
              <h2 className="mt-5 font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.points.map((p) => <li key={p} className="flex gap-2 text-foreground/80"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />{p}</li>)}
              </ul>
              <Button asChild size="sm" variant="ghost" className="mt-5 -ml-3 gap-1 text-primary">
                <Link to="/appointment">Learn more <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </SiteLayout>
  );
}
