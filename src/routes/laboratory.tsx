import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FlaskConical, Home, Clock, CheckCircle2, Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/laboratory")({
  head: () => ({ meta: [
    { title: "Laboratory — Pakistan Hospital" },
    { name: "description", content: "Diagnostic tests, home sample collection, and online reports at Pakistan Hospital laboratory." },
  ] }),
  component: LabPage,
});

const tests = [
  { name: "Complete Blood Count (CBC)", code: "LAB-001", price: 800, tat: "Same day", cat: "Hematology" },
  { name: "Liver Function Test (LFT)", code: "LAB-014", price: 1500, tat: "Same day", cat: "Biochemistry" },
  { name: "Lipid Profile", code: "LAB-022", price: 1800, tat: "Same day", cat: "Biochemistry" },
  { name: "HbA1c (Diabetes)", code: "LAB-031", price: 1200, tat: "4 hours", cat: "Endocrine" },
  { name: "Thyroid Profile (TSH, T3, T4)", code: "LAB-044", price: 2200, tat: "Next day", cat: "Endocrine" },
  { name: "Vitamin D (25-OH)", code: "LAB-051", price: 2800, tat: "Next day", cat: "Nutrition" },
  { name: "COVID-19 PCR", code: "LAB-077", price: 4500, tat: "6 hours", cat: "Microbiology" },
  { name: "Urine Routine Examination", code: "LAB-009", price: 600, tat: "2 hours", cat: "Clinical Path" },
  { name: "Dengue NS1 Antigen", code: "LAB-088", price: 1600, tat: "Same day", cat: "Serology" },
];

function LabPage() {
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [home, setHome] = useState(false);

  const filtered = tests.filter(t => t.name.toLowerCase().includes(q.toLowerCase()) || t.code.toLowerCase().includes(q.toLowerCase()));
  const total = cart.reduce((s, c) => s + (tests.find(t => t.code === c)?.price ?? 0), 0) + (home ? 500 : 0);

  const toggle = (c: string) => setCart(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const book = () => {
    if (!cart.length) { toast.error("Please add at least one test"); return; }
    toast.success(`Booked ${cart.length} test(s) · Total Rs. ${total}`, { description: home ? "Home collection scheduled within 24 hrs." : "Visit the lab any time 7AM–9PM." });
    setCart([]); setHome(false);
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-br from-accent via-background to-background">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Badge variant="secondary" className="rounded-full"><FlaskConical className="mr-1 h-3 w-3 text-primary" /> NABL-equivalent accredited lab</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Laboratory & Diagnostics</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">800+ pathology tests, 6 advanced imaging modalities, and free home sample collection across Lahore.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tests by name or code…" className="pl-9" />
          </div>
          <div className="grid gap-3">
            {filtered.map(t => {
              const inCart = cart.includes(t.code);
              return (
                <Card key={t.code} className={`border-border transition ${inCart ? "border-primary/50 bg-primary/5" : ""}`}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2"><p className="font-semibold">{t.name}</p><Badge variant="secondary" className="text-[10px]">{t.cat}</Badge></div>
                      <p className="mt-0.5 text-xs text-muted-foreground">Code {t.code} · <Clock className="inline h-3 w-3" /> {t.tat}</p>
                    </div>
                    <div className="text-right"><p className="font-display text-lg font-bold">Rs. {t.price}</p></div>
                    <Button size="sm" variant={inCart ? "default" : "outline"} onClick={() => toggle(t.code)}>
                      {inCart ? <><CheckCircle2 className="mr-1 h-4 w-4" />Added</> : "Add"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
            {filtered.length === 0 && <p className="text-sm text-muted-foreground">No tests match your search.</p>}
          </div>
        </div>

        <aside>
          <Card className="sticky top-24 border-border">
            <CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold">Your booking</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {cart.length === 0 && <li className="text-muted-foreground">No tests added yet.</li>}
                {cart.map(c => {
                  const t = tests.find(x => x.code === c)!;
                  return <li key={c} className="flex justify-between"><span className="truncate">{t.name}</span><span className="text-muted-foreground">Rs.{t.price}</span></li>;
                })}
              </ul>
              <label className="mt-4 flex items-center gap-2 rounded-md border border-border bg-secondary/40 p-3 text-sm">
                <input type="checkbox" checked={home} onChange={e => setHome(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
                <Home className="h-4 w-4 text-primary" /> Home sample collection <span className="ml-auto font-medium">Rs. 500</span>
              </label>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-xl font-bold">Rs. {total}</span>
              </div>
              <Button className="mt-4 w-full" onClick={book}>Book lab tests</Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </SiteLayout>
  );
}
