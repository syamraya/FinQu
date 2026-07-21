"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/stores/quiz.store";
import { Clock } from "lucide-react"; // jika menggunakan lucide-react

interface TimerProps {
  initialSeconds?: number; // default misal 600 detik (10 menit)
  onTimeUp?: () => void;
}

export default function Timer({
  initialSeconds = 600,
  onTimeUp,
}: TimerProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isMounted, setIsMounted] = useState(false);

  // Mencegah Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Hitung mundur setiap 1 detik
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          
          // Panggil fungsi saat waktu habis (jika ada)
          if (onTimeUp) {
            onTimeUp();
          } else {
            // Default action: paksa selesaikan quiz / redirect
            router.push("/result");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up interval saat unmount
    return () => clearInterval(timer);
  }, [isMounted, onTimeUp, router]);

  // Format detik ke format mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isMounted) {
    return null; // atau placeholder skeleton
  }

  const isWarning = timeLeft <= 60; // Peringatan jika sisa waktu <= 1 menit

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-bold transition-colors ${
        isWarning
          ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/40"
          : "border-border bg-card text-card-foreground"
      }`}
    >
      <Clock className={`h-4 w-4 ${isWarning ? "animate-pulse" : ""}`} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}