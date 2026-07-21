interface Props {
  answers: (number | null)[];
  current: number;
  onSelect: (index: number) => void;
}

export default function QuestionGrid({
  answers,
  current,
  onSelect,
}: Props) {
  return (
    <div className="mt-8">

      <h3 className="mb-4 font-semibold">
        Nomor Soal
      </h3>

      <div className="grid grid-cols-5 gap-3 md:grid-cols-10">

        {answers.map((answer, index) => (

          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`
            h-12
            rounded-xl
            border
            font-semibold
            transition

            ${
              current === index
                ? "border-primary bg-primary text-primary-foreground"
                : answer !== null
                ? "bg-green-500 text-white"
                : "hover:bg-muted"
            }
            `}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </div>
  );
}