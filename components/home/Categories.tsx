import { Building2 } from "lucide-react";

const categories = [
  "Dasar Perbankan",
  "Produk Bank",
  "OJK & BI",
  "Kredit",
  "KYC / AML",
  "Ekonomi",
];

export default function Categories() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Kategori Quiz
          </h2>

          <p className="mt-4 text-muted-foreground">
            Pilih kategori sesuai materi yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-4 rounded-2xl border p-6 transition hover:border-primary hover:shadow-lg"
            >
              <Building2 className="h-8 w-8" />

              <div>
                <h3 className="font-semibold">
                  {category}
                </h3>

                <p className="text-sm text-muted-foreground">
                  100+ soal
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}