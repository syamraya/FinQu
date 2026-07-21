"use client";

import Link from "next/link";
import ReviewCard from "@/components/result/ReviewCard";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/stores/quiz.store";

export default function ResultPage() {
  const {
    score,
    correct,
    wrong,
    answers,
    questions, // 👈 Ambil questions dari Zustand store, bukan file statis
    reset,
  } = useQuizStore();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="rounded-2xl border p-10">
        <h1 className="text-5xl font-bold">Hasil Quiz</h1>

        <div className="mt-10 grid grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 text-center">
            <h2 className="text-5xl font-bold">{score}</h2>
            <p>Score</p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h2 className="text-5xl font-bold text-green-600">{correct}</h2>
            <p>Benar</p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h2 className="text-5xl font-bold text-red-600">{wrong}</h2>
            <p>Salah</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/quiz">
            <Button onClick={reset}>Coba Lagi</Button>
          </Link>
        </div>
      </div>

      {/* Sekarang hanya merender soal yang sedang dimainkan */}
      <div className="mt-10 space-y-6">
        {questions.map((question, index) => (
          <ReviewCard
            key={question.id}
            number={index + 1}
            question={question.question}
            options={question.options}
            userAnswer={answers[index]}
            correctAnswer={question.answer}
            explanation={question.explanation}
          />
        ))}
      </div>
    </main>
  );
}