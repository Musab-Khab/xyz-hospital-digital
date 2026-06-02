import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ur";

const dict = {
  en: {
    home: "Home", about: "About", departments: "Departments", doctors: "Doctors",
    services: "Services", contact: "Contact", laboratory: "Laboratory",
    findDoctor: "Find a doctor", book: "Book appointment",
    emergency: "Emergency", patientPortal: "Patient Portal", doctorPortal: "Doctor Portal",
    admin: "Admin", tagline: "Care, redefined", open247: "Open 24/7 · PMDC & ISO accredited",
    welcome: "Welcome back", language: "اردو",
  },
  ur: {
    home: "ہوم", about: "ہمارے بارے میں", departments: "شعبہ جات", doctors: "ڈاکٹرز",
    services: "خدمات", contact: "رابطہ", laboratory: "لیبارٹری",
    findDoctor: "ڈاکٹر تلاش کریں", book: "اپوائنٹمنٹ بک کریں",
    emergency: "ایمرجنسی", patientPortal: "مریض پورٹل", doctorPortal: "ڈاکٹر پورٹل",
    admin: "ایڈمن", tagline: "بہترین صحت، آپ کے قریب", open247: "چوبیس گھنٹے کھلا · PMDC تسلیم شدہ",
    welcome: "خوش آمدید", language: "English",
  },
} as const;

export type TKey = keyof typeof dict["en"];

const Ctx = createContext<{ lang: Lang; t: (k: TKey) => string; toggle: () => void }>({
  lang: "en", t: (k) => dict.en[k], toggle: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ur" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
      localStorage.setItem("lang", lang);
    }
  }, [lang]);
  return (
    <Ctx.Provider value={{ lang, t: (k) => dict[lang][k], toggle: () => setLang(l => l === "en" ? "ur" : "en") }}>
      {children}
    </Ctx.Provider>
  );
}

export const useI18n = () => useContext(Ctx);
