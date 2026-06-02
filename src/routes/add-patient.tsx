import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, LayoutDashboard, CalendarDays, FileText, FlaskConical, Receipt, Pill } from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/add-patient")({
  head: () => ({ meta: [{ title: "Add Patient — Pakistan Hospital" }, { name: "robots", content: "noindex" }] }),
  component: AddPatientPage,
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

type Patient = { mrn: string; name: string; age: string; gender: string; phone: string; cnic: string; notes: string };

function AddPatientPage() {
  const [list, setList] = useState<Patient[]>([
    { mrn: "MRN-204812", name: "Ahmed Raza", age: "34", gender: "Male", phone: "0300-1234567", cnic: "35202-1234567-1", notes: "Routine check" },
    { mrn: "MRN-204813", name: "Fatima Bibi", age: "52", gender: "Female", phone: "0321-7654321", cnic: "35202-7654321-2", notes: "Diabetic follow-up" },
  ]);
  const [form, setForm] = useState<Patient>({ mrn: "", name: "", age: "", gender: "", phone: "", cnic: "", notes: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone) { toast.error("Name, age and phone are required"); return; }
    const mrn = `MRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setList(l => [{ ...form, mrn }, ...l]);
    toast.success(`Patient registered: ${form.name}`, { description: `Medical Record # ${mrn}` });
    setForm({ mrn: "", name: "", age: "", gender: "", phone: "", cnic: "", notes: "" });
  };

  return (
    <PortalLayout title="Register a new patient" role="Admin" user={{ name: "Reception Desk", initials: "RD", sub: "Front Office" }} nav={nav}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-1">
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2"><UserPlus className="h-5 w-5 text-primary" />New patient</h2>
            <form onSubmit={submit} className="mt-5 grid gap-3">
              <div><Label>Full name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Bilal Khan" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Age *</Label><Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} /></div>
                <div><Label>Gender</Label>
                  <Select value={form.gender} onValueChange={v => setForm({ ...form, gender: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Phone *</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="03xx-xxxxxxx" /></div>
              <div><Label>CNIC</Label><Input value={form.cnic} onChange={e => setForm({ ...form, cnic: e.target.value })} placeholder="35202-xxxxxxx-x" /></div>
              <div><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Chief complaint / referral notes" /></div>
              <Button type="submit" className="mt-2">Register patient</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border lg:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-5"><h2 className="font-display text-lg font-semibold">Recently registered</h2><Badge variant="secondary">{list.length} patients</Badge></div>
            <Table>
              <TableHeader><TableRow><TableHead>MRN</TableHead><TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Phone</TableHead><TableHead>CNIC</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {list.map(p => (
                  <TableRow key={p.mrn}>
                    <TableCell className="font-mono text-xs">{p.mrn}</TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.age} · {p.gender || "—"}</TableCell>
                    <TableCell>{p.phone}</TableCell>
                    <TableCell>{p.cnic || "—"}</TableCell>
                    <TableCell><Button asChild size="sm" variant="outline"><Link to="/patient">Open</Link></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
