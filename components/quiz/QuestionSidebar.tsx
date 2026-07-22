interface Props {
  answers: (number | null)[];
  flagged: boolean[];
  current: number;
  onSelect: (index: number) => void;
  onToggleFlag: (index: number) => void;
}

export default function QuestionSidebar({
  answers,
  flagged,
  current,
  onSelect,
  onToggleFlag,
}: Props) {
  return (
    <aside className="rounded-2xl border p-6">
      <div className="mb-6 flex items-center justify-between">
  <h3 className="text-lg font-semibold">
    Nomor Soal
  </h3>

  <button
    onClick={() => onToggleFlag(current)}
    className={`rounded-lg px-3 py-1 text-sm transition ${
      flagged[current]
        ? "bg-red-500 text-white"
        : "border hover:bg-muted"
    }`}
  >
    🚩 {flagged[current] ? "Hapus" : "Tandai"}
  </button>
</div>
      <div className="mt-6">
</div>
      <div className="grid grid-cols-5 gap-3">
        {answers.map((answer, index) => {
          const isCurrent = current === index;
          const isAnswered = answer !== null;

          return (
            <button
  key={index}
  onClick={() => onSelect(index)}
  className={`
    relative
    h-11
    w-11
    rounded-lg
    border
    text-sm
    font-semibold
    transition

    ${
      isCurrent
        ? "border-blue-600 bg-blue-600 text-white"
        : isAnswered
        ? "border-green-500 bg-green-500 text-white"
        : "hover:bg-muted"
    }
  `}
>
  {index + 1}

  {flagged[index] && (
    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
  )}
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
          <div className="h-4 w-4 rounded bg-red-600" />
          <span>Flag soal</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border" />
          <span>Belum dijawab</span>
        </div>
      </div>
    </aside>
  );
}
