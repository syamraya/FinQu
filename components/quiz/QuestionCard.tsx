"use client";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="mt-8 rounded-2xl border p-8">

      <p className="mb-2 text-sm text-muted-foreground">
        Soal {questionNumber} dari {totalQuestions}
      </p>

      <h2 className="mb-8 text-2xl font-semibold">
        {question}
      </h2>

      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedAnswer === index
                ? "border-primary bg-primary/10"
                : "hover:bg-muted"
            }`}
          >
            <span className="mr-3 font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>

            {option}
          </button>
        ))}
      </div>
    </div>
  );
}