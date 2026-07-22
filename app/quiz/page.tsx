"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { getRandomQuestions, type Question } from "@/data/questions";

import { Button } from "@/components/ui/button";
import Timer from "@/components/quiz/Timer";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuestionNavigator from "@/components/quiz/QuestionNavigator";
import QuestionSidebar from "@/components/quiz/QuestionSidebar";

import { useQuizStore } from "@/stores/quiz.store";
import { calculateScore } from "@/lib/calculateScore";

const MAX_DODGES = 5;
const DODGE_RADIUS = 130;
const DODGE_COOLDOWN_MS = 260;

const BUTTON_TEXTS = [
  "Selesai",
  "Yakin? 🤨",
  "Serius? 😏",
  "Jangan dulu 😭",
  "Beneran nih? 😂",
  "Oke deh 😔",
];

const FINAL_TRICK_TEXT = "Eitss! 😝";

export default function QuizPage() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const [dodgeCount, setDodgeCount] = useState(0);
  const [buttonPos, setButtonPos] = useState<{ top: number; left: number } | null>(null);
  const [rotation, setRotation] = useState(0);

  const [finalTrickUsed, setFinalTrickUsed] = useState(false);
  const finalTrickUsedRef = useRef(false);

  const dodgeCountRef = useRef(0);
  const lastDodgeAtRef = useRef(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRickroll, setShowRickroll] = useState(false);

  const setResult = useQuizStore((state) => state.setResult);
  const setQuizAnswers = useQuizStore((state) => state.setAnswers);
  const setQuizQuestions = useQuizStore((state) => state.setQuestions); // 👈 1. Ambil dari store

  useEffect(() => {
    const randomQuestions = getRandomQuestions(20);
    setQuestions(randomQuestions);
    setQuizQuestions(randomQuestions); // 👈 2. Simpan 20 soal acak ke Zustand Store di sini
    setAnswers(Array(randomQuestions.length).fill(null));
  }, [setQuizQuestions]);

  const question = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const allAnswered = answers.length > 0 && answers.every((a) => a !== null);
  const isFleeing = allAnswered && dodgeCount < MAX_DODGES;
  const [flagged, setFlagged] = useState<boolean[]>(
  Array(questions.length).fill(false)
  );
  function toggleFlag(index: number) {
  const copy = [...flagged];

  copy[index] = !copy[index];

  setFlagged(copy);
}

  function handleSelect(index: number) {
    if (!question) return;
    const copy = [...answers];
    copy[currentQuestion] = index;
    setAnswers(copy);

    if (index !== question.answer) {
      const isLucky = Math.random() < 0.05;
      
      if (isLucky) {
        setShowRickroll(true);
        setTimeout(() => setShowRickroll(false), 3000);
      }
    }
  }

  function moveButtonAway(
    cursorX: number,
    cursorY: number,
    velocity: { x: number; y: number },
    distanceMultiplier = 1
  ) {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const padding = 16;
    const width = rect.width;
    const height = rect.height;

    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    const awayX = centerX - cursorX;
    const awayY = centerY - cursorY;

    const velMag = Math.hypot(velocity.x, velocity.y);
    const velX = velMag > 0 ? velocity.x / velMag : 0;
    const velY = velMag > 0 ? velocity.y / velMag : 0;

    let angle = Math.atan2(awayY, awayX);
    if (awayX === 0 && awayY === 0) angle = Math.random() * Math.PI * 2;

    const velAngle = Math.atan2(-velY, -velX);
    if (velMag > 0) {
      angle = angle * 0.65 + velAngle * 0.35;
    }
    angle += (Math.random() - 0.5) * (Math.PI / 4);

    const panicFactor = 1 + dodgeCountRef.current * 0.15;
    const jumpDistance = (180 + Math.random() * 140) * panicFactor * distanceMultiplier;

    let newLeft = centerX + Math.cos(angle) * jumpDistance - width / 2;
    let newTop = centerY + Math.sin(angle) * jumpDistance - height / 2;

    newLeft = Math.min(Math.max(newLeft, padding), window.innerWidth - width - padding);
    newTop = Math.min(Math.max(newTop, padding), window.innerHeight - height - padding);

    setButtonPos({ top: newTop, left: newLeft });
    setRotation((Math.random() - 0.5) * 30);
  }

  function dodge(cursorX: number, cursorY: number, velocity: { x: number; y: number }) {
    const now = performance.now();
    if (now - lastDodgeAtRef.current < DODGE_COOLDOWN_MS) return;
    if (dodgeCountRef.current >= MAX_DODGES) return;

    lastDodgeAtRef.current = now;
    moveButtonAway(cursorX, cursorY, velocity);

    dodgeCountRef.current = Math.min(dodgeCountRef.current + 1, MAX_DODGES);
    setDodgeCount(dodgeCountRef.current);
  }

  useEffect(() => {
    if (!isFleeing) return;

    function handlePointerMove(e: PointerEvent) {
      const btn = buttonRef.current;
      if (!btn) return;

      const last = lastMouseRef.current;
      const velocity = last
        ? { x: e.clientX - last.x, y: e.clientY - last.y }
        : { x: 0, y: 0 };
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < DODGE_RADIUS) {
        dodge(e.clientX, e.clientY, velocity);
      }
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isFleeing]);

  useEffect(() => {
    if (!allAnswered) {
      dodgeCountRef.current = 0;
      lastDodgeAtRef.current = 0;
      finalTrickUsedRef.current = false;
      setDodgeCount(0);
      setButtonPos(null);
      setRotation(0);
      setFinalTrickUsed(false);
    }
  }, [allAnswered]);

  function handleFinishClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!allAnswered) return;

    if (isFleeing) {
      lastDodgeAtRef.current = 0;
      dodge(e.clientX, e.clientY, { x: 0, y: 0 });
      return;
    }

    if (!finalTrickUsedRef.current) {
      finalTrickUsedRef.current = true;
      setFinalTrickUsed(true);
      moveButtonAway(e.clientX, e.clientY, { x: 0, y: 0 }, 1.3);
      return;
    }

    const result = calculateScore(questions, answers);
  
    setQuizAnswers(answers);
    setResult(result.score, result.correct, result.wrong);
    router.push("/result");
  }

  const dodgeTransitionMs = Math.max(120, 220 - dodgeCount * 20);

  const displayText = !allAnswered
    ? "Jawab semua soal dulu"
    : finalTrickUsed
    ? FINAL_TRICK_TEXT
    : BUTTON_TEXTS[Math.min(dodgeCount, BUTTON_TEXTS.length - 1)];

  if (questions.length === 0 || !question) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center p-8">
        <p className="text-lg font-medium text-muted-foreground">Memuat soal...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <QuizHeader />
        <Timer />
      </div>

      <QuizProgress value={progress} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <QuestionCard
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            question={question.question}
            options={question.options}
            selectedAnswer={answers[currentQuestion]}
            onSelect={handleSelect}
          />

          <QuestionNavigator
            current={currentQuestion}
            total={questions.length}
            onPrev={() => setCurrentQuestion((prev) => prev - 1)}
            onNext={() => setCurrentQuestion((prev) => prev + 1)}
          />

          <div className="mt-8 flex justify-end">
            <Button
              ref={buttonRef}
              size="lg"
              disabled={!allAnswered}
              onClick={handleFinishClick}
              style={
                buttonPos
                  ? {
                      position: "fixed",
                      top: `${buttonPos.top}px`,
                      left: `${buttonPos.left}px`,
                      transform: `rotate(${rotation}deg)`,
                      transition: `top ${dodgeTransitionMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), left ${dodgeTransitionMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${dodgeTransitionMs}ms ease`,
                      zIndex: 9999,
                    }
                  : undefined
              }
            >
              {displayText}
            </Button>
          </div>
        </div>

<QuestionSidebar
  answers={answers}
  flagged={flagged}
  current={currentQuestion}
  onSelect={setCurrentQuestion}
  onToggleFlag={toggleFlag}
/>
      </div>

      {showRickroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <video autoPlay playsInline className="max-h-[80vh] rounded-xl shadow-2xl">
            <source src="/videos/rickroll.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </main>
  );
}