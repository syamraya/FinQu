interface Props {
  answers: (number | null)[];
  current: number;
  onSelect: (index: number) => void;
}

export default function QuestionSidebar({
  answers,
  current,
  onSelect,
}: Props) {
  return (
    <aside className="rounded-2xl border p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Nomor Soal
      </h3>

      <div className="grid grid-cols-5 gap-3">
        {answers.map((answer, index) => {
          const isCurrent = current === index;
          const isAnswered = answer !== null;

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                h-11 w-11 rounded-lg border text-sm font-semibold transition

                ${
                  isCurrent
                    ? "bg-blue-600 text-white border-blue-600"
                    : isAnswered
                    ? "bg-green-500 text-white border-green-500"
                    : "hover:bg-muted"
                }
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-600" />
          <span>Soal aktif</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-500" />
          <span>Sudah dijawab</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border" />
          <span>Belum dijawab</span>
        </div>
      </div>
    </aside>
  );
}
