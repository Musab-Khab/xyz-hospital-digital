import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, Baby, Bone, Brain, HeartPulse, Microscope, Stethoscope, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { departments } from "@/lib/mock-data";

const iconMap = { HeartPulse, Bone, Brain, Baby, Microscope, Ambulance, Stethoscope } as const;

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Pakistan Hospital" },
      { name: "description", content: "Explore 28 specialties at Pakistan Hospital, from cardiology and oncology to pediatrics and emergency medicine." },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Badge variant="secondary" className="border border-border bg-background">Specialties</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Departments at Pakistan Hospital</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">Multidisciplinary teams collaborating across 28 specialties to deliver coordinated care under one roof.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 grid gap-6 md:grid-cols-2">
        {departments.map((d) => {
          const Icon = iconMap[d.icon as keyof typeof iconMap] ?? Stethoscope;
          return (
            <Card key={d.slug} className="border-border">
              <CardContent className="p-7">
                <div className="flex items-start gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-display text-xl font-semibold">{d.name}</h2>
                      <Badge variant="secondary" className="border border-border">{d.doctors} specialists</Badge>
                    </div>
                    <p className="mt-1 text-sm text-primary">{d.tagline}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{d.description}</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      {d.procedures.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button asChild size="sm"><Link to="/appointment">Book in {d.name}</Link></Button>
                      <Button asChild size="sm" variant="outline" className="gap-1.5">
                        <Link to="/doctors">See doctors <ArrowRight className="h-3.5 w-3.5" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </SiteLayout>
  );
}
