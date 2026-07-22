import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoriesSection() { // sesuaikan nama komponennya
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
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quiz?kategori=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border p-6 transition hover:border-primary hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-2xl`}
              >
                {category.icon}
              </div>

              <h3 className="font-semibold text-lg">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {category.questions}+ soal
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}