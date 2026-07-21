import { Button } from "@/components/ui/button";

interface Props {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function QuestionNavigator({
  current,
  total,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="mt-8 flex justify-between">

      <Button
        variant="outline"
        onClick={onPrev}
        disabled={current === 0}
      >
        Previous
      </Button>

      <Button
        onClick={onNext}
        disabled={current === total - 1}
      >
        Next
      </Button>

    </div>
  );
}