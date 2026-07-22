interface Props {
  number: number;
  question: string;
  options: string[];
  userAnswer: number | null;
  correctAnswer: number;
  explanation?: string;
}

export default function ReviewCard({
  number,
  question,
  options,
  userAnswer,
  correctAnswer,
  explanation,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-sm">

      <h2 className="font-bold text-lg">
        Soal {number}
      </h2>

      <p className="mt-3 text-muted-foreground">
        {question}
      </p>

      <div className="mt-6 space-y-3">

        {options.map((option, index) => {

          const correct = index === correctAnswer;
          const selected = index === userAnswer;

          return (
            <div
              key={index}
              className={`
                rounded-xl border p-4 transition-all

                ${
                  correct
                    ? `
                      border-green-500
                      bg-green-100
                      text-green-900

                      dark:border-green-400
                      dark:bg-green-900/30
                      dark:text-green-100
                    `
                    : ""
                }

                ${
                  selected && !correct
                    ? `
                      border-red-500
                      bg-red-100
                      text-red-900

                      dark:border-red-400
                      dark:bg-red-900/30
                      dark:text-red-100
                    `
                    : ""
                }

                ${
                  !correct && !selected
                    ? `
                      bg-background
                      text-foreground
                    `
                    : ""
                }
              `}
            >
              <div className="flex items-center justify-between">

                <span>
                  <strong>
                    {String.fromCharCode(65 + index)}.
                  </strong>{" "}
                  {option}
                </span>

                {correct && (
                  <span className="text-xl">
                    ✅
                  </span>
                )}

                {selected && !correct && (
                  <span className="text-xl">
                    ❌
                  </span>
                )}

              </div>
            </div>
          );
        })}

      </div>

      {explanation && (
        <div className="mt-6 rounded-xl border bg-muted p-4">
          <h3 className="font-semibold">
            📖 Pembahasan
          </h3>

          <p className="mt-2 text-sm text-muted-foreground leading-7">
            {explanation}
          </p>
        </div>
      )}

    </div>
  );
}