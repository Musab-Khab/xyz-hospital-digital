import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Ambulance,
  ArrowRight,
  CalendarCheck,
  HeartPulse,
  Bone,
  Brain,
  Baby,
  Microscope,
  Stethoscope,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { departments, stats, testimonials, news } from "@/lib/mock-data";

const iconMap = { HeartPulse, Bone, Brain, Baby, Microscope, Ambulance, Stethoscope } as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pakistan Hospital — Care with compassion" },
      {
        name: "description",
        content:
          "Book appointments with 320+ specialists, access your records, and explore world-class care at Pakistan Hospital.",
      },
      { property: "og:title", content: "Pakistan Hospital — Care with compassion" },
      {
        property: "og:description",
        content: "Book appointments, find doctors, and access your medical records.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Emergency banner */}
      <div className="bg-destructive text-destructive-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm md:px-6">
          <p className="flex items-center gap-2 font-medium">
            <Ambulance className="h-4 w-4" /> 24/7 Emergency & Level 1 Trauma Center
          </p>
          <a
            href="tel:911"
            className="inline-flex items-center gap-2 rounded-md bg-background/15 px-3 py-1 font-semibold hover:bg-background/25"
          >
            <Phone className="h-3.5 w-3.5" /> Call 1122 now
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 gradient-warm" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="secondary"
                className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs"
              >
                <Sparkles className="mr-1.5 h-3 w-3 text-primary" /> NABH · JCI · ISO 9001
                accredited
              </Badge>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Exceptional care, <span className="text-primary">delivered with heart.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                320+ board-certified specialists. 42 years of trust. One destination for everything
                from a routine check-up to the most complex quaternary care.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/appointment">
                    <CalendarCheck className="h-4 w-4" /> Book appointment
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/doctors">
                    <Search className="h-4 w-4" /> Find a doctor
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Insurance accepted
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" /> 4.9/5 from 12,000 patients
                </span>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-border bg-card p-2 shadow-xl shadow-primary/5">
              <div className="rounded-2xl bg-gradient-to-br from-accent via-card to-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Quick appointment
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">Book in 30 seconds</h3>
                <div className="mt-5 grid gap-3">
                  {["Choose department", "Pick a doctor", "Select a time slot"].map((s, i) => (
                    <div
                      key={s}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium">{s}</p>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <Button asChild className="mt-5 w-full">
                  <Link to="/appointment">Start booking</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-background p-8 text-center ring-1 ring-border"
            >
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Centers of excellence"
          title="Featured departments"
          subtitle="Specialty programs led by nationally recognized physicians."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.slice(0, 6).map((d, i) => {
            const Icon = iconMap[d.icon as keyof typeof iconMap] ?? Stethoscope;
            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="group h-full overflow-hidden border-border transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground/90">
                      {d.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{d.doctors} specialists</span>
                      <Link
                        to="/departments"
                        className="inline-flex items-center gap-1 font-medium text-primary group-hover:gap-2 transition-all"
                      >
                        Explore <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader eyebrow="Patient stories" title="Trusted by 1.2 million patients a year" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Card className="h-full border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/15 text-primary">
                          {t.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader eyebrow="Newsroom" title="Latest news & updates" className="text-left" />
          <Link
            to="/about"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {news.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border transition-all hover:border-primary/40 hover:shadow-md">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/15 via-accent to-secondary" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="border border-border">
                      {n.tag}
                    </Badge>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-br from-primary to-[color-mix(in_oklab,var(--primary)_70%,black)] text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              Your health deserves an expert opinion.
            </h3>
            <p className="mt-1 text-primary-foreground/85">
              Book a same-day appointment or schedule a second-opinion consult.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/appointment">Book appointment</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
