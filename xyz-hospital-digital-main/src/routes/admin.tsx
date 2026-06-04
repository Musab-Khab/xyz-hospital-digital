import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, BarChart3, Users, Building2, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PortalLayout, type NavItem } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { adminMonthly, departmentLoad, doctors, departments } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Pakistan Hospital" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPortal,
});

const nav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/admin", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { to: "/admin", label: "Doctors", icon: <Users className="h-4 w-4" /> },
  { to: "/admin", label: "Departments", icon: <Building2 className="h-4 w-4" /> },
];

const pieColors = ["#ea7a3a", "#3aa9ea", "#3ac8a4", "#e5b73a", "#a07ae0", "#e25563"];

function AdminPortal() {
  return (
    <PortalLayout
      title="Hospital overview"
      role="Admin"
      user={{ name: "Operations Admin", initials: "OA", sub: "Executive office" }}
      nav={nav}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Patients this month" value="115.5K" delta="+5.2%" />
          <Kpi label="Appointments" value="37,012" delta="+4.6%" />
          <Kpi label="Revenue (USD M)" value="$5.5M" delta="+6.1%" />
          <Kpi label="Avg LOS (days)" value="3.4" delta="-0.2" deltaPositive={false} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold">Patient volume & revenue</h2>
                  <p className="text-sm text-muted-foreground">Last 6 months</p>
                </div>
                <Badge variant="secondary" className="border border-border">
                  <TrendingUp className="mr-1 h-3 w-3 text-primary" /> Trending up
                </Badge>
              </div>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={adminMonthly}
                    margin={{ top: 10, right: 12, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea7a3a" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#ea7a3a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #eee" }} />
                    <Area
                      type="monotone"
                      dataKey="patients"
                      stroke="#ea7a3a"
                      strokeWidth={2}
                      fill="url(#g1)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold">Department load</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={departmentLoad}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={88}
                      paddingAngle={2}
                    >
                      {departmentLoad.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-semibold">Appointments by month</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <BarChart data={adminMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Bar dataKey="appointments" fill="#ea7a3a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Doctor management</h2>
                <Button size="sm">Add doctor</Button>
              </div>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.slice(0, 6).map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.name}</TableCell>
                        <TableCell className="text-muted-foreground">{d.specialty}</TableCell>
                        <TableCell>{d.experience} yrs</TableCell>
                        <TableCell>{d.rating}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold">Department overview</h2>
              <div className="mt-4 grid gap-3">
                {departments.map((d) => (
                  <div
                    key={d.slug}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-semibold">{d.doctors}</p>
                      <p className="text-xs text-muted-foreground">specialists</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

function Kpi({
  label,
  value,
  delta,
  deltaPositive = true,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
}) {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-3xl font-bold">{value}</p>
        {delta && (
          <p
            className={`mt-1 text-xs font-medium ${deltaPositive ? "text-emerald-600" : "text-destructive"}`}
          >
            {delta} vs last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
