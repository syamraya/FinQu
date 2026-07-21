const stats = [
  {
    number: "3000+",
    title: "Soal",
  },
  {
    number: "25+",
    title: "Kategori",
  },
  {
    number: "50K+",
    title: "Pengguna",
  },
  {
    number: "95%",
    title: "Tingkat Kepuasan",
  },
];

export default function Stats() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border p-8 text-center"
            >
              <h2 className="text-5xl font-bold">
                {stat.number}
              </h2>

              <p className="mt-3 text-muted-foreground">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}