import {
  CirclePlay,
  FileCheck,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: CirclePlay,
    title: "Pilih Kategori",
    desc: "Pilih materi yang ingin dipelajari.",
  },
  {
    icon: FileCheck,
    title: "Kerjakan Quiz",
    desc: "Jawab soal dengan timer.",
  },
  {
    icon: Trophy,
    title: "Lihat Hasil",
    desc: "Dapatkan skor dan pembahasan.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 text-center">

          <h2 className="text-4xl font-bold">
            Cara Kerja
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border p-8"
              >
                <Icon className="mb-5 h-10 w-10" />

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}