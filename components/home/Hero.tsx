import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function Hero() {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-4xl px-6 text-center">

        <span className="rounded-full border px-4 py-2 text-sm">
          🇮🇩 Platform Latihan Tes Perbankan
        </span>

        <h1 className="mt-8 text-6xl font-bold tracking-tight">
          Kuasai Tes Perbankan
          <br />
          dengan Ribuan Soal
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Latihan soal perbankan hingga
          materi ekonomi dalam satu platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">

<Link href="/quiz">
  <Button size="lg">
    Mulai Quiz
  </Button>
</Link>

        <Link href="/categories">
          <Button
            size="lg"
            variant="outline"
          >
            Lihat Kategori
                      </Button>
        </Link>

        </div>

      </div>

    </section>
  );
}