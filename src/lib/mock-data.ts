export type Department = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string; // lucide icon name
  doctors: number;
  procedures: string[];
};

export const departments: Department[] = [
  { slug: "cardiology", name: "Cardiology", tagline: "Advanced heart & vascular care", description: "Comprehensive cardiac diagnostics, interventional cardiology, and rehabilitation by board-certified cardiologists.", icon: "HeartPulse", doctors: 18, procedures: ["Angioplasty", "Pacemaker implant", "Echocardiography", "Cardiac CT"] },
  { slug: "orthopedics", name: "Orthopedics", tagline: "Bone, joint & spine specialists", description: "From minimally invasive arthroscopy to complex joint replacements and sports injury rehabilitation.", icon: "Bone", doctors: 14, procedures: ["Knee replacement", "Hip arthroplasty", "Spine surgery", "Fracture care"] },
  { slug: "neurology", name: "Neurology", tagline: "Brain, spine & nervous system", description: "Specialized care for stroke, epilepsy, movement disorders, and neurodegenerative conditions.", icon: "Brain", doctors: 11, procedures: ["EEG", "MRI brain", "Stroke care", "Botox therapy"] },
  { slug: "pediatrics", name: "Pediatrics", tagline: "Compassionate child healthcare", description: "Well-baby visits, vaccinations, neonatal intensive care, and pediatric specialty services.", icon: "Baby", doctors: 22, procedures: ["NICU care", "Vaccinations", "Pediatric surgery", "Growth assessment"] },
  { slug: "oncology", name: "Oncology", tagline: "Personalized cancer treatment", description: "Multidisciplinary cancer care with chemotherapy, radiation, targeted therapy, and immunotherapy.", icon: "Microscope", doctors: 9, procedures: ["Chemotherapy", "Radiation therapy", "Tumor board", "Biopsy"] },
  { slug: "emergency", name: "Emergency Medicine", tagline: "24/7 trauma & critical care", description: "Level 1 trauma center staffed around the clock with rapid response and stabilization protocols.", icon: "Ambulance", doctors: 26, procedures: ["Trauma care", "Resuscitation", "Critical transport", "Triage"] },
  { slug: "internal-medicine", name: "Internal Medicine", tagline: "Adult primary & preventive care", description: "Annual physicals, chronic disease management, and coordinated specialist referrals for adults.", icon: "Stethoscope", doctors: 31, procedures: ["Annual exams", "Diabetes care", "Hypertension", "Preventive screening"] },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  departmentSlug: string;
  experience: number;
  qualifications: string;
  rating: number;
  reviews: number;
  languages: string[];
  availability: string[];
  bio: string;
  initials: string;
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Aisha Rahman", specialty: "Interventional Cardiologist", departmentSlug: "cardiology", experience: 18, qualifications: "MD, DM Cardiology, FACC", rating: 4.9, reviews: 412, languages: ["English", "Hindi", "Urdu"], availability: ["Mon 9–1", "Wed 9–1", "Fri 2–6"], bio: "Pioneer of complex angioplasty in the region with 6,000+ interventions performed.", initials: "AR" },
  { id: "d2", name: "Dr. Marcus Chen", specialty: "Orthopedic Surgeon", departmentSlug: "orthopedics", experience: 14, qualifications: "MBBS, MS Ortho, Fellowship Joint Replacement", rating: 4.8, reviews: 289, languages: ["English", "Mandarin"], availability: ["Tue 10–2", "Thu 10–2", "Sat 9–12"], bio: "Specializes in robotic-assisted knee and hip arthroplasty.", initials: "MC" },
  { id: "d3", name: "Dr. Elena Petrova", specialty: "Neurologist", departmentSlug: "neurology", experience: 12, qualifications: "MD, DM Neurology", rating: 4.9, reviews: 198, languages: ["English", "Russian"], availability: ["Mon 2–6", "Thu 9–1"], bio: "Movement disorders and Parkinson's disease expert.", initials: "EP" },
  { id: "d4", name: "Dr. James O'Connor", specialty: "Pediatrician", departmentSlug: "pediatrics", experience: 21, qualifications: "MD, FAAP", rating: 5.0, reviews: 612, languages: ["English"], availability: ["Mon 9–5", "Wed 9–5", "Fri 9–1"], bio: "Beloved by families for warm, evidence-based care from newborns to teens.", initials: "JO" },
  { id: "d5", name: "Dr. Priya Nair", specialty: "Medical Oncologist", departmentSlug: "oncology", experience: 16, qualifications: "MD, DM Oncology", rating: 4.9, reviews: 174, languages: ["English", "Hindi", "Malayalam"], availability: ["Tue 9–1", "Fri 9–1"], bio: "Breast and GI cancer specialist leading our precision medicine program.", initials: "PN" },
  { id: "d6", name: "Dr. Samuel Adeyemi", specialty: "Emergency Physician", departmentSlug: "emergency", experience: 10, qualifications: "MD, FACEP", rating: 4.7, reviews: 96, languages: ["English", "French"], availability: ["24/7 rotation"], bio: "Trauma lead for the regional Level 1 trauma program.", initials: "SA" },
  { id: "d7", name: "Dr. Hannah Weiss", specialty: "Internal Medicine", departmentSlug: "internal-medicine", experience: 9, qualifications: "MD, ABIM", rating: 4.8, reviews: 233, languages: ["English", "German"], availability: ["Mon–Fri 9–5"], bio: "Focus on preventive cardiology and chronic disease management.", initials: "HW" },
  { id: "d8", name: "Dr. Rafael Santos", specialty: "Cardiac Electrophysiologist", departmentSlug: "cardiology", experience: 20, qualifications: "MD, FHRS", rating: 4.9, reviews: 305, languages: ["English", "Spanish", "Portuguese"], availability: ["Wed 2–6", "Fri 9–1"], bio: "Arrhythmia and pacemaker specialist.", initials: "RS" },
  { id: "d9", name: "Dr. Lin Watanabe", specialty: "Pediatric Neurologist", departmentSlug: "neurology", experience: 13, qualifications: "MD, FAAN", rating: 4.9, reviews: 142, languages: ["English", "Japanese"], availability: ["Tue 9–12", "Thu 2–5"], bio: "Pediatric epilepsy and developmental neurology.", initials: "LW" },
  { id: "d10", name: "Dr. Omar Haddad", specialty: "Orthopedic Spine Surgeon", departmentSlug: "orthopedics", experience: 17, qualifications: "MBBS, MCh Ortho", rating: 4.8, reviews: 211, languages: ["English", "Arabic"], availability: ["Mon 10–2", "Thu 10–2"], bio: "Minimally invasive spine surgery.", initials: "OH" },
];

export const testimonials = [
  { name: "Sara M.", role: "Cardiology patient", quote: "From admission to discharge, every nurse and doctor made me feel like the only patient in the building. Truly world-class.", rating: 5 },
  { name: "David L.", role: "Father of NICU baby", quote: "Our daughter spent 6 weeks in the NICU. The team didn't just save her — they cared for our whole family.", rating: 5 },
  { name: "Amelia K.", role: "Orthopedic patient", quote: "Robotic knee replacement and I was walking the next day. The recovery program is genuinely best-in-class.", rating: 5 },
];

export const news = [
  { title: "XYZ Hospital opens new 60-bed cardiac wing", date: "May 28, 2026", tag: "Announcement", excerpt: "State-of-the-art hybrid OR and ICU beds expand our capacity for complex cardiac care." },
  { title: "Free community screening for diabetes & hypertension", date: "May 14, 2026", tag: "Community", excerpt: "Walk-in screenings every Saturday in June at the main lobby and three satellite clinics." },
  { title: "Dr. Aisha Rahman recognized in national Top 50 Cardiologists", date: "April 30, 2026", tag: "Awards", excerpt: "A career milestone built on 6,000+ life-saving interventional procedures." },
];

export const stats = [
  { label: "Years of care", value: "42+" },
  { label: "Board-certified specialists", value: "320" },
  { label: "Beds across campus", value: "850" },
  { label: "Patients served / year", value: "1.2M" },
];

export const upcomingAppointments = [
  { id: "a1", doctor: "Dr. Aisha Rahman", department: "Cardiology", date: "Jun 8, 2026", time: "10:30 AM", mode: "In-person", status: "Confirmed" },
  { id: "a2", doctor: "Dr. Hannah Weiss", department: "Internal Medicine", date: "Jun 15, 2026", time: "2:00 PM", mode: "Telemedicine", status: "Confirmed" },
  { id: "a3", doctor: "Dr. Elena Petrova", department: "Neurology", date: "Jul 3, 2026", time: "11:15 AM", mode: "In-person", status: "Pending" },
];

export const appointmentHistory = [
  { id: "h1", doctor: "Dr. Aisha Rahman", department: "Cardiology", date: "Apr 22, 2026", note: "Annual cardiac review — all clear", status: "Completed" },
  { id: "h2", doctor: "Dr. Marcus Chen", department: "Orthopedics", date: "Feb 11, 2026", note: "Post-op knee follow-up", status: "Completed" },
  { id: "h3", doctor: "Dr. Hannah Weiss", department: "Internal Medicine", date: "Jan 8, 2026", note: "Lipid panel discussion", status: "Completed" },
];

export const prescriptions = [
  { id: "p1", drug: "Atorvastatin 20 mg", dose: "1 tablet nightly", doctor: "Dr. Hannah Weiss", issued: "Jan 8, 2026", refills: 2 },
  { id: "p2", drug: "Metoprolol 25 mg", dose: "1 tablet twice daily", doctor: "Dr. Aisha Rahman", issued: "Apr 22, 2026", refills: 3 },
  { id: "p3", drug: "Vitamin D3 1000 IU", dose: "1 tablet daily", doctor: "Dr. Hannah Weiss", issued: "Jan 8, 2026", refills: 5 },
];

export const labReports = [
  { id: "l1", name: "Complete Blood Count", date: "Apr 22, 2026", status: "Normal", doctor: "Dr. Aisha Rahman" },
  { id: "l2", name: "Lipid Panel", date: "Apr 22, 2026", status: "Borderline", doctor: "Dr. Aisha Rahman" },
  { id: "l3", name: "HbA1c", date: "Jan 8, 2026", status: "Normal", doctor: "Dr. Hannah Weiss" },
  { id: "l4", name: "Thyroid Function", date: "Jan 8, 2026", status: "Normal", doctor: "Dr. Hannah Weiss" },
];

export const billing = [
  { id: "b1", item: "Cardiology consult", date: "Apr 22, 2026", amount: 220, status: "Paid" },
  { id: "b2", item: "Lipid panel", date: "Apr 22, 2026", amount: 85, status: "Paid" },
  { id: "b3", item: "Telemedicine visit", date: "Jun 15, 2026", amount: 120, status: "Pending" },
];

export const todaysAppointments = [
  { id: "t1", time: "09:00", patient: "Michael Johnson", reason: "Follow-up: hypertension", status: "Checked in" },
  { id: "t2", time: "09:30", patient: "Anita Desai", reason: "Annual physical", status: "In room" },
  { id: "t3", time: "10:00", patient: "Carlos Ruiz", reason: "Chest pain consult", status: "Waiting" },
  { id: "t4", time: "10:45", patient: "Yuki Tanaka", reason: "Pre-op clearance", status: "Confirmed" },
  { id: "t5", time: "11:30", patient: "Grace Mensah", reason: "Lab review", status: "Confirmed" },
  { id: "t6", time: "14:00", patient: "Oliver Brandt", reason: "Telemedicine", status: "Confirmed" },
];

export const patientList = [
  { id: "pt1", name: "Michael Johnson", age: 58, lastVisit: "Apr 22", condition: "Hypertension", risk: "Moderate" },
  { id: "pt2", name: "Anita Desai", age: 34, lastVisit: "Mar 11", condition: "Preventive", risk: "Low" },
  { id: "pt3", name: "Carlos Ruiz", age: 47, lastVisit: "May 2", condition: "Angina, R/O CAD", risk: "High" },
  { id: "pt4", name: "Yuki Tanaka", age: 62, lastVisit: "May 18", condition: "Pre-op cardiac", risk: "Moderate" },
  { id: "pt5", name: "Grace Mensah", age: 51, lastVisit: "Apr 30", condition: "Hyperlipidemia", risk: "Low" },
];

export const adminMonthly = [
  { month: "Jan", patients: 92000, appointments: 28500, revenue: 4.2 },
  { month: "Feb", patients: 88000, appointments: 27800, revenue: 4.1 },
  { month: "Mar", patients: 99000, appointments: 31200, revenue: 4.6 },
  { month: "Apr", patients: 104000, appointments: 33100, revenue: 4.9 },
  { month: "May", patients: 110000, appointments: 35400, revenue: 5.2 },
  { month: "Jun", patients: 115500, appointments: 37000, revenue: 5.5 },
];

export const departmentLoad = [
  { name: "Cardiology", value: 28 },
  { name: "Orthopedics", value: 22 },
  { name: "Pediatrics", value: 18 },
  { name: "Neurology", value: 12 },
  { name: "Oncology", value: 10 },
  { name: "Emergency", value: 10 },
];
