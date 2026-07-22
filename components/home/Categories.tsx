import Link from "next/link";
import { Building2 } from "lucide-react";
import { categoryList } from "@/data/questions";

export default function Categories() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Kategori Quiz</h2>
          <p className="mt-4 text-muted-foreground">
            Pilih kategori sesuai materi yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryList.map((category) => (
            <Link
              key={category.slug}
              href={`/quiz?kategori=${category.slug}`}
              className="flex items-center gap-4 rounded-2xl border p-6 transition hover:border-primary hover:shadow-lg"
            >
              <Building2 className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.count} soal</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}