import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
        />
      ))}
    </div>
  );
}