// ✅ BENAR: Menggunakan array questions yang di-pass
import { type Question } from "@/data/questions";

export function calculateScore(questions: Question[], answers: (number | null)[]) {
  let correct = 0;
  
  questions.forEach((q, index) => {
    if (answers[index] === q.answer) {
      correct++;
    }
  });

  const total = questions.length; // Ini akan bernilai 20
  const wrong = total - correct;
  const score = Math.round((correct / total) * 100);

  return { score, correct, wrong, total };
}