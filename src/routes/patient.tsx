import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, CalendarDays, FileText, Pill, FlaskConical, Receipt,
  CalendarPlus, Download, Video, ArrowRight, UserPlus, BookOpen,
} from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  upcomingAppointments, appointmentHistory, prescriptions, labReports, billing,
} from "@/lib/mock-data";
import ayat1 from "@/assets/ayat-health-1.jpg";
import ayat2 from "@/assets/ayat-health-2.jpg";

export const Route = createFileRoute("/patient")({
  head: () => ({ meta: [{ title: "Patient Portal — Pakistan Hospital" }, { name: "robots", content: "noindex" }] }),
  component: PatientPortal,
});

const nav: NavItem[] = [
  { to: "/patient", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/add-patient", label: "Add Patient", icon: <UserPlus className="h-4 w-4" /> },
  { to: "/patient", label: "Appointments", icon: <CalendarDays className="h-4 w-4" /> },
  { to: "/laboratory", label: "Laboratory", icon: <FlaskConical className="h-4 w-4" /> },
  { to: "/patient", label: "Records", icon: <FileText className="h-4 w-4" /> },
  { to: "/patient", label: "Prescriptions", icon: <Pill className="h-4 w-4" /> },
  { to: "/patient", label: "Billing", icon: <Receipt className="h-4 w-4" /> },
];

function PatientPortal() {
  return (
    <PortalLayout
      title="Welcome back, Sarah"
      role="Patient"
      user={{ name: "Sarah Williams", initials: "SW", sub: "MRN 00482910" }}
      nav={nav}
    >
      <div className="grid gap-6">
        {/* Islamic Ayat — Health & Healing */}
        <Card className="overflow-hidden border-border bg-gradient-to-br from-emerald-50 via-card to-amber-50 dark:from-emerald-950/40 dark:via-card dark:to-amber-950/30">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 border-b border-border bg-background/60 px-5 py-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase">Words of Healing · شفاء کے الفاظ</h2>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border border-border bg-card">
                <img src={ayat1} alt="Quranic verse on healing - Surah Ash-Shu'ara 26:80" loading="lazy" width={1024} height={1024} className="h-56 w-full object-cover" />
                <figcaption className="p-4">
                  <p className="font-display text-base font-semibold">"And when I am ill, it is He who cures me."</p>
                  <p className="mt-1 text-sm text-muted-foreground">Surah Ash-Shu'ara (26:80) · "اور جب میں بیمار ہوتا ہوں تو وہی مجھے شفا دیتا ہے"</p>
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-xl border border-border bg-card">
                <img src={ayat2} alt="Quranic verse on healing - Surah Al-Isra 17:82" loading="lazy" width={1024} height={1024} className="h-56 w-full object-cover" />
                <figcaption className="p-4">
                  <p className="font-display text-base font-semibold">"And We send down of the Qur'an that which is healing and mercy for the believers."</p>
                  <p className="mt-1 text-sm text-muted-foreground">Surah Al-Isra (17:82) · "اور ہم قرآن میں سے وہ نازل کرتے ہیں جو شفا ہے"</p>
                </figcaption>
              </figure>
            </div>
          </CardContent>
        </Card>


        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Upcoming visits" value="3" hint="Next: Jun 8" />
          <Kpi label="Active prescriptions" value="3" hint="2 refills due" />
          <Kpi label="Pending bills" value="$120" hint="Due Jun 30" />
          <Kpi label="Wellness score" value="82" hint="+4 this quarter">
            <Progress value={82} className="mt-3 h-1.5" />
          </Kpi>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Next appointment</h2>
                <Button asChild size="sm" variant="outline" className="gap-1.5"><Link to="/appointment"><CalendarPlus className="h-4 w-4" />Book new</Link></Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-5 rounded-xl border border-border bg-secondary/40 p-5">
                <Avatar className="h-14 w-14"><AvatarFallback className="bg-primary/15 text-primary">AR</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Dr. Aisha Rahman · Cardiology</p>
                  <p className="text-sm text-muted-foreground">Annual cardiac review</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-semibold">Jun 8, 2026</p>
                  <p className="text-sm text-muted-foreground">10:30 AM · Main campus</p>
                </div>
                <div className="flex w-full justify-end gap-2 sm:w-auto">
                  <Button size="sm" variant="outline" className="gap-1.5"><Video className="h-4 w-4" />Join</Button>
                  <Button size="sm">Reschedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold">Care team</h2>
              <ul className="mt-4 space-y-3">
                {[
                  { n: "Dr. Aisha Rahman", r: "Cardiologist", i: "AR" },
                  { n: "Dr. Hannah Weiss", r: "Internal Medicine", i: "HW" },
                  { n: "Dr. Marcus Chen", r: "Orthopedics", i: "MC" },
                ].map((m) => (
                  <li key={m.n} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/15 text-primary">{m.i}</AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{m.n}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.r}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-muted-foreground"><ArrowRight className="h-4 w-4" /></Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="w-full justify-start overflow-x-auto bg-secondary/60">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="records">Medical records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="labs">Lab reports</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card className="border-border"><CardContent className="p-0">
              <DataTable
                headers={["Doctor", "Department", "Date", "Time", "Mode", "Status", ""]}
                rows={upcomingAppointments.map((a) => [
                  a.doctor, a.department, a.date, a.time, a.mode,
                  <Badge key={a.id} variant={a.status === "Confirmed" ? "default" : "secondary"} className={a.status === "Confirmed" ? "bg-primary/15 text-primary hover:bg-primary/15" : ""}>{a.status}</Badge>,
                  <Button key={"b"+a.id} size="sm" variant="outline">Manage</Button>,
                ])}
              />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-border"><CardContent className="p-0">
              <DataTable
                headers={["Doctor", "Department", "Date", "Note", "Status"]}
                rows={appointmentHistory.map((a) => [
                  a.doctor, a.department, a.date, a.note,
                  <Badge key={a.id} variant="secondary">{a.status}</Badge>,
                ])}
              />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="records">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { t: "Discharge summary — Knee arthroplasty", d: "Feb 14, 2026" },
                { t: "Echocardiogram report", d: "Apr 22, 2026" },
                { t: "Immunization record", d: "Updated May 2026" },
                { t: "Allergy & medication history", d: "Updated May 2026" },
              ].map((r) => (
                <Card key={r.t} className="border-border"><CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-primary" /><div><p className="font-medium">{r.t}</p><p className="text-xs text-muted-foreground">{r.d}</p></div></div>
                  <Button size="sm" variant="outline" className="gap-1.5"><Download className="h-4 w-4" />Download</Button>
                </CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card className="border-border"><CardContent className="p-0">
              <DataTable
                headers={["Medication", "Dosage", "Prescribed by", "Issued", "Refills", ""]}
                rows={prescriptions.map((p) => [
                  p.drug, p.dose, p.doctor, p.issued, p.refills,
                  <Button key={p.id} size="sm" variant={p.refills > 0 ? "default" : "outline"}>{p.refills > 0 ? "Request refill" : "Request renewal"}</Button>,
                ])}
              />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="labs">
            <Card className="border-border"><CardContent className="p-0">
              <DataTable
                headers={["Test", "Date", "Ordered by", "Status", ""]}
                rows={labReports.map((l) => [
                  l.name, l.date, l.doctor,
                  <Badge key={l.id} variant={l.status === "Normal" ? "default" : "secondary"} className={l.status === "Normal" ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15" : "bg-amber-500/15 text-amber-700 hover:bg-amber-500/15"}>{l.status}</Badge>,
                  <Button key={"b"+l.id} size="sm" variant="outline" className="gap-1.5"><Download className="h-4 w-4" />PDF</Button>,
                ])}
              />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-border"><CardContent className="p-0">
              <DataTable
                headers={["Item", "Date", "Amount", "Status", ""]}
                rows={billing.map((b) => [
                  b.item, b.date, `$${b.amount}`,
                  <Badge key={b.id} variant={b.status === "Paid" ? "default" : "secondary"} className={b.status === "Paid" ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15" : ""}>{b.status}</Badge>,
                  <Button key={"b"+b.id} size="sm" variant={b.status === "Pending" ? "default" : "outline"}>{b.status === "Pending" ? "Pay now" : "Receipt"}</Button>,
                ])}
              />
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}

function Kpi({ label, value, hint, children }: { label: string; value: string; hint?: string; children?: React.ReactNode }) {
  return (
    <Card className="border-border"><CardContent className="p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {children}
    </CardContent></Card>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <Table>
      <TableHeader><TableRow>{headers.map((h, i) => <TableHead key={i}>{h}</TableHead>)}</TableRow></TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>{r.map((c, j) => <TableCell key={j}>{c}</TableCell>)}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
