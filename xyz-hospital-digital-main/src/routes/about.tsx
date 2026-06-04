import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Building2, Target, Heart, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pakistan Hospital" },
      {
        name: "description",
        content:
          "42 years of compassionate care. Meet our leadership, mission, facilities and accreditations.",
      },
    ],
  }),
  component: AboutPage,
});

const leaders = [
  { name: "Dr. Vivian Holloway", role: "Chief Executive Officer", initials: "VH" },
  { name: "Dr. Karthik Iyer", role: "Chief Medical Officer", initials: "KI" },
  { name: "Dr. Naomi Brandt", role: "Chief of Surgery", initials: "NB" },
  { name: "Lisa Okafor, RN", role: "Chief Nursing Officer", initials: "LO" },
];

const facilities = [
  {
    name: "Hybrid Operating Rooms",
    count: "12 suites",
    desc: "Image-guided ORs for cardiac, neuro and orthopedic procedures.",
  },
  { name: "Intensive Care", count: "120 ICU beds", desc: "MICU, SICU, CCU and a Level III NICU." },
  {
    name: "Imaging & Diagnostics",
    count: "24/7",
    desc: "3T MRI, 256-slice CT, PET-CT and interventional radiology.",
  },
  {
    name: "Cancer Center",
    count: "Linac + Cyberknife",
    desc: "Advanced radiation oncology and a 60-chair infusion suite.",
  },
];

const accreditations = [
  "NABH",
  "JCI Gold Seal",
  "ISO 9001:2015",
  "College of American Pathologists",
  "Magnet Recognition",
  "Green OT",
];

export function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Badge variant="secondary" className="border border-border bg-background">
            About us
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            A hospital where medicine meets humanity.
          </h1>
          <p className="mt-5 max-w-3xl text-muted-foreground md:text-lg">
            Founded in 1984 as a 60-bed community hospital, Pakistan Hospital is today an 850-bed
            quaternary care destination serving over 1.2 million patients each year across 28
            specialties.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-6 md:grid-cols-2">
        <Card className="border-border">
          <CardContent className="p-8">
            <Target className="h-7 w-7 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              To deliver world-class clinical outcomes with the warmth and respect every patient and
              family deserves — regardless of background or ability to pay.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-8">
            <Heart className="h-7 w-7 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our vision</h2>
            <p className="mt-3 text-muted-foreground">
              To be the most trusted destination for complex care in the region — a teaching
              hospital that advances medicine while staying close to the communities we serve.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-display text-3xl font-bold">Leadership team</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Physicians and operators who put patients first.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((p) => (
              <Card key={p.name} className="border-border">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto h-20 w-20">
                    <AvatarFallback className="bg-primary/15 text-lg font-semibold text-primary">
                      {p.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl font-bold">Facilities</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {facilities.map((f) => (
            <Card key={f.name} className="border-border">
              <CardContent className="flex items-start gap-4 p-6">
                <Users className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{f.name}</h3>
                    <Badge variant="secondary" className="border border-border">
                      {f.count}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="font-display text-3xl font-bold">Accreditations</h2>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Independent recognition of safe, high-quality care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {accreditations.map((a) => (
              <Badge
                key={a}
                variant="secondary"
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
              >
                <ShieldCheck className="mr-2 h-3.5 w-3.5 text-primary" /> {a}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
