import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Ambulance } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pakistan Hospital" },
      {
        name: "description",
        content:
          "Visit, call or message Pakistan Hospital. 24/7 emergency line and same-day appointment desk.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Badge variant="secondary" className="border border-border bg-background">
            Contact
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            We're here, around the clock.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Reach us by phone, email, or stop by the main campus.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-destructive text-destructive-foreground">
                  <Ambulance className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
                    Emergency
                  </p>
                  <a href="tel:911" className="font-display text-xl font-bold">
                    1122
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Level 1 trauma · stroke alert · STEMI · pediatric emergency.
              </p>
            </CardContent>
          </Card>
          <InfoRow
            icon={<Phone />}
            title="Appointments"
            lines={["+1 (555) 010-2200", "Mon–Sat 7am–9pm"]}
          />
          <InfoRow
            icon={<Mail />}
            title="Email"
            lines={["care@pakistanhospital.pk", "billing@pakistanhospital.pk"]}
          />
          <InfoRow
            icon={<MapPin />}
            title="Main campus"
            lines={["1200 Wellness Avenue", "Riverside District, City 56001"]}
          />
          <InfoRow
            icon={<Clock />}
            title="Visiting hours"
            lines={["General wards: 4pm–7pm", "ICU: by clinical permission"]}
          />
        </div>

        <div className="grid gap-8 lg:col-span-2">
          <Card className="overflow-hidden border-border">
            <iframe
              title="Pakistan Hospital location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.187%2C51.498%2C-0.137%2C51.518&layer=mapnik"
              className="h-72 w-full"
              loading="lazy"
            />
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Non-urgent inquiries only. For emergencies dial 1122.
              </p>
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  toast.success("Message sent — we'll respond within 1 business day.");
                }}
              >
                <Field id="firstName" label="First name" />
                <Field id="lastName" label="Last name" />
                <Field id="email" label="Email" type="email" />
                <Field id="phone" label="Phone" />
                <div className="sm:col-span-2 grid gap-1.5">
                  <Label htmlFor="msg">How can we help?</Label>
                  <Textarea id="msg" placeholder="Type your message…" rows={5} required />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting you agree to our privacy policy.
                  </p>
                  <Button type="submit">{sent ? "Sent ✓" : "Send message"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required />
    </div>
  );
}

function InfoRow({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <Card className="border-border">
      <CardContent className="flex items-start gap-3 p-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          {lines.map((l) => (
            <p key={l} className="text-sm">
              {l}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
