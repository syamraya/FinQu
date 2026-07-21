import { Progress } from "@/components/ui/progress";

interface Props {
  value: number;
}

export default function QuizProgress({
  value,
}: Props) {
  return <Progress value={value} />;
}