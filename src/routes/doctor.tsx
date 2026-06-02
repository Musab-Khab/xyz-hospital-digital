import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, Pill, CalendarRange, Save, Search,
} from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { todaysAppointments, patientList } from "@/lib/mock-data";

export const Route = createFileRoute("/doctor")({
  head: () => ({ meta: [{ title: "Doctor Portal — XYZ Hospital" }, { name: "robots", content: "noindex" }] }),
  component: DoctorPortal,
});

const nav: NavItem[] = [
  { to: "/doctor", label: "Today", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/doctor", label: "Patients", icon: <Users className="h-4 w-4" /> },
  { to: "/doctor", label: "Consult notes", icon: <FileText className="h-4 w-4" /> },
  { to: "/doctor", label: "Prescriptions", icon: <Pill className="h-4 w-4" /> },
  { to: "/doctor", label: "Schedule", icon: <CalendarRange className="h-4 w-4" /> },
];

function DoctorPortal() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <PortalLayout
      title="Good morning, Dr. Rahman"
      role="Doctor"
      user={{ name: "Dr. Aisha Rahman", initials: "AR", sub: "Cardiology · Room 302" }}
      nav={nav}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Today's patients" value="12" hint="3 still to see" />
          <Kpi label="In waiting room" value="2" hint="Avg wait 8 min" />
          <Kpi label="Pending notes" value="4" hint="From yesterday" />
          <Kpi label="Rx to renew" value="6" hint="Due this week" />
        </div>

        <Tabs defaultValue="today">
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="today">Today's appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="notes">Consult notes</TabsTrigger>
            <TabsTrigger value="rx">Prescription</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <Card className="border-border"><CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Patient</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {todaysAppointments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono">{a.time}</TableCell>
                      <TableCell className="font-medium">{a.patient}</TableCell>
                      <TableCell className="text-muted-foreground">{a.reason}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={a.status === "In room" ? "bg-primary/15 text-primary" : a.status === "Waiting" ? "bg-amber-500/15 text-amber-700" : a.status === "Checked in" ? "bg-emerald-500/15 text-emerald-700" : ""}>{a.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="outline">Open chart</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card className="border-border">
              <CardContent className="p-5">
                <div className="relative max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search patients" />
                </div>
                <div className="mt-4">
                  <Table>
                    <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Last visit</TableHead><TableHead>Active condition</TableHead><TableHead>Risk</TableHead><TableHead></TableHead></TableRow></TableHeader>
                    <TableBody>
                      {patientList.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell>{p.age}</TableCell>
                          <TableCell className="text-muted-foreground">{p.lastVisit}</TableCell>
                          <TableCell>{p.condition}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={p.risk === "High" ? "bg-destructive/15 text-destructive" : p.risk === "Moderate" ? "bg-amber-500/15 text-amber-700" : "bg-emerald-500/15 text-emerald-700"}>{p.risk}</Badge>
                          </TableCell>
                          <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="border-border"><CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">Consultation note — Michael Johnson</h2>
                  <p className="text-sm text-muted-foreground">58 y/o male · MRN 00112340 · Follow-up: hypertension</p>
                </div>
                <Button onClick={() => toast.success("Note saved to chart")} className="gap-1.5"><Save className="h-4 w-4" /> Save note</Button>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <NoteField id="subj" label="Subjective" placeholder="Patient reports…" />
                <NoteField id="obj" label="Objective" placeholder="Vitals, exam findings…" />
                <NoteField id="ass" label="Assessment" placeholder="Diagnoses & impressions…" />
                <NoteField id="plan" label="Plan" placeholder="Medications, follow-up, labs…" />
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="rx">
            <Card className="border-border"><CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold">New prescription</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field id="pt" label="Patient" defaultValue="Michael Johnson · 58M" />
                <Field id="dx" label="Diagnosis" defaultValue="I10 Essential hypertension" />
                <Field id="drug" label="Medication" placeholder="Start typing…" defaultValue="Amlodipine 5 mg" />
                <Field id="freq" label="Frequency" defaultValue="Once daily" />
                <Field id="dur" label="Duration" defaultValue="90 days" />
                <Field id="ref" label="Refills" defaultValue="3" />
                <div className="md:col-span-2"><NoteField id="instr" label="Instructions" placeholder="Take with food in the morning…" /></div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">Save draft</Button>
                <Button onClick={() => toast.success("Prescription sent to pharmacy")}>Send to pharmacy</Button>
              </div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="grid gap-6 md:grid-cols-[auto_1fr]">
              <Card className="border-border"><CardContent className="p-3">
                <Calendar mode="single" selected={date} onSelect={setDate} className="pointer-events-auto" />
              </CardContent></Card>
              <Card className="border-border"><CardContent className="p-5">
                <h3 className="font-display text-lg font-semibold">Week overview</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {["Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
                    <div key={d} className="rounded-lg border border-border p-3">
                      <p className="text-xs uppercase text-muted-foreground">{d}</p>
                      <p className="mt-1 font-display text-xl font-semibold">{6 + i * 2}</p>
                      <p className="text-xs text-muted-foreground">patients</p>
                    </div>
                  ))}
                </div>
              </CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="border-border"><CardContent className="p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </CardContent></Card>
  );
}

function Field({ id, label, defaultValue, placeholder }: { id: string; label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}
function NoteField({ id, label, placeholder }: { id: string; label: string; placeholder?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} rows={4} />
    </div>
  );
}
