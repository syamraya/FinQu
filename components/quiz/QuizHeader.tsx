type QuizHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function QuizHeader({
  title = "Quiz Perbankan",
  subtitle = "Jawab semua soal dengan benar.",
}: QuizHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="text-muted-foreground">
        {subtitle}
      </p>
      <p className="text-muted-foreground text-xs">
        10% rate memicu easter egg
      </p>
    </div>
  );
}