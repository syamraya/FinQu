import CategoryGrid from "@/components/categories/CategoryGrid";

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold">
          Kategori Quiz
        </h1>

        <p className="mt-4 text-muted-foreground">
          Pilih kategori yang ingin kamu pelajari.
        </p>
      </div>

      <CategoryGrid />
    </main>
  );
}