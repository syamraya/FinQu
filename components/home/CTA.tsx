import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border p-12 text-center">
        <h2 className="text-4xl font-bold">
          Siap Menguji Kemampuanmu?
        </h2>

        <p className="mt-4 text-muted-foreground">
          Mulai latihan sekarang dan tingkatkan peluangmu lolos tes perbankan.
        </p>

        <Link href="/quiz">
  <Button size="lg" className="mt-8">
    Mulai Quiz
  </Button>
</Link>
      </div>
    </section>
  );
}