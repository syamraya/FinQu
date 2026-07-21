import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description: string;
  icon: string;
  questions: number;
  color: string;
}

export default function CategoryCard({
  title,
  description,
  icon,
  questions,
  color,
}: Props) {
  return (
    <Link href="/quiz">
      <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className={`h-2 bg-gradient-to-r ${color}`} />

        <CardContent className="space-y-5 p-6">
          <div className="text-5xl">{icon}</div>

          <div>
            <h2 className="text-xl font-bold">{title}</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <Badge variant="secondary">
            {questions} Soal
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}