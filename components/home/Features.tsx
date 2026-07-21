import {
  BookOpen,
  BarChart3,
  Timer,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "3000+ Soal",
    description:
      "Latihan soal perbankan, OJK, BI, kredit, hingga ekonomi.",
  },
  {
    icon: BarChart3,
    title: "Skor Instan",
    description:
      "Lihat hasil, pembahasan, dan nilai secara langsung.",
  },
  {
    icon: Timer,
    title: "Simulasi Tes",
    description:
      "Kerjakan soal dengan timer seperti tes rekrutmen.",
  },
  {
    icon: Smartphone,
    title: "Responsif",
    description:
      "Nyaman digunakan di desktop maupun smartphone.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Kenapa Memilih FinQu?
          </h2>

          <p className="mt-4 text-muted-foreground">
            Semua yang kamu butuhkan untuk mempersiapkan tes perbankan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="mb-6 h-10 w-10" />

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}