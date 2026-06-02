import { useEffect, useState } from "react";
import { HeartPulse } from "lucide-react";

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash_seen")) return;
    setShow(true);
    const t1 = setTimeout(() => setFade(true), 1400);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splash_seen", "1");
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklab,var(--primary)_60%,black)] text-primary-foreground transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-700">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30">
          <HeartPulse className="h-10 w-10 animate-pulse" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">Pakistan Hospital</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">پاکستان ہسپتال — Care with compassion</p>
        </div>
        <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/2 animate-[loader_1.4s_ease-in-out_infinite] rounded-full bg-white" />
        </div>
      </div>
      <style>{`@keyframes loader { 0% { transform: translateX(-100%) } 100% { transform: translateX(220%) } }`}</style>
    </div>
  );
}
