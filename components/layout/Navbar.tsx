import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          FinQu
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>

          <Link href="/categories">
            Kategori
          </Link>

          <Link href="/quiz">
            Quiz
          </Link>
            <div className="flex items-center gap-3">
    <ThemeToggle />
  </div>
        </nav>

<Link href="/quiz">
  <Button size="lg">
    Mulai Quiz
  </Button>
</Link>

      </div>
    </header>
  );
}