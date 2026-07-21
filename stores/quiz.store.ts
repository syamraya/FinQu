import { create } from "zustand";
import { Question } from "@/data/questions"; // Pastikan path tipe Question ini sesuai

interface QuizState {
  score: number;
  correct: number;
  wrong: number;
  answers: (number | null)[];
  questions: Question[]; // 👈 Tambahkan state ini

  setAnswers: (answers: (number | null)[]) => void;
  setQuestions: (questions: Question[]) => void; // 👈 Tambahkan fungsi ini
  setResult: (
    score: number,
    correct: number,
    wrong: number
  ) => void;

  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  score: 0,
  correct: 0,
  wrong: 0,
  answers: [],
  questions: [], // 👈 Default ke array kosong

  setAnswers: (answers) => set({ answers }),
  setQuestions: (questions) => set({ questions }), // 👈 Menyimpan soal aktif

  setResult: (score, correct, wrong) =>
    set({
      score,
      correct,
      wrong,
    }),

  reset: () =>
    set({
      score: 0,
      correct: 0,
      wrong: 0,
      answers: [],
      questions: [], // 👈 Reset soal
    }),
}));