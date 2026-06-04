import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, GraduationCap, Clock, Languages } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, doctors } from "@/lib/mock-data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Find a doctor — Pakistan Hospital" },
      {
        name: "description",
        content: "Search 320+ board-certified specialists by name, department, or availability.",
      },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("all");

  const filtered = useMemo(() => {
    return doctors.filter(
      (d) =>
        (dept === "all" || d.departmentSlug === dept) &&
        (q === "" ||
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.specialty.toLowerCase().includes(q.toLowerCase())),
    );
  }, [q, dept]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Badge variant="secondary" className="border border-border bg-background">
            Doctor directory
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Find the right specialist for you
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            320+ physicians across 28 specialties. Search by name, condition, or department.
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-3 sm:grid-cols-[1fr_220px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or specialty"
                className="h-11 pl-9"
              />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="h-11">Search</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm text-muted-foreground">{filtered.length} doctors found</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => {
            const dep = departments.find((x) => x.slug === d.departmentSlug);
            return (
              <Card
                key={d.id}
                className="border-border transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
                        {d.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                      <p className="text-sm text-primary">{d.specialty}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{dep?.name}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {d.rating} (
                      {d.reviews})
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" /> {d.experience} yrs
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Languages className="h-3.5 w-3.5 text-primary" /> {d.languages.join(", ")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{d.bio}</p>
                  <p className="mt-3 text-xs text-foreground/70">
                    <span className="font-semibold">Qualifications:</span> {d.qualifications}
                  </p>
                  <div className="mt-3 rounded-lg bg-secondary/60 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/70">
                      <Clock className="h-3.5 w-3.5" /> Available
                    </p>
                    <p className="mt-1 text-sm">{d.availability.join(" · ")}</p>
                  </div>
                  <Button asChild className="mt-4 w-full">
                    <Link to="/appointment">Book appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
