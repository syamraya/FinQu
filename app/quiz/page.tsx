import { Suspense } from "react";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center p-8">
          <p className="text-lg font-medium text-muted-foreground">Memuat soal...</p>
        </main>
      }
    >
      <QuizClient />
    </Suspense>
  );
}