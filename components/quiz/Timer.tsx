"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
}

export default function Timer({
  initialSeconds = 600,
  onTimeUp,
}: TimerProps) {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted, timeLeft]);

  // ✅ Jalankan saat waktu benar-benar habis
  useEffect(() => {
    if (!isMounted) return;

    if (timeLeft === 0) {
      if (onTimeUp) {
        onTimeUp();
      } else {
        router.push("/result");
      }
    }
  }, [timeLeft, isMounted, onTimeUp, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!isMounted) return null;

  const isWarning = timeLeft <= 60;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-bold transition-colors ${
        isWarning
          ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/40"
          : "border-border bg-card text-card-foreground"
      }`}
    >
      <Clock
        className={`h-4 w-4 ${
          isWarning ? "animate-pulse" : ""
        }`}
      />

      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}