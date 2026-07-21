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
    <div className="rounded-2xl border p-8">

      <h2 className="font-bold">
        Soal {number}
      </h2>

      <p className="mt-3">
        {question}
      </p>

      <div className="mt-6 space-y-3">

        {options.map((option, index) => {

          const correct =
            index === correctAnswer;

          const selected =
            index === userAnswer;

          return (
            <div
              key={index}
              className={`
              rounded-lg border p-4

              ${
                correct
                  ? "border-green-500 bg-green-50"
                  : ""
              }

              ${
                selected && !correct
                  ? "border-red-500 bg-red-50"
                  : ""
              }
              `}
            >
              {String.fromCharCode(65 + index)}.
              {" "}
              {option}
            </div>
          );
        })}

      </div>

      {explanation && (
        <div className="mt-6 rounded-xl bg-muted p-4">
          <strong>Pembahasan</strong>

          <p className="mt-2">
            {explanation}
          </p>
        </div>
      )}

    </div>
  );
}