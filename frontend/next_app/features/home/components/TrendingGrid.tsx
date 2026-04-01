import Link from "next/link";
import { Container } from "@/components/layout/Container";

const trending = [
  { id: "p-001", name: "Aromatic Hand Wash", price: "$19.99" },
  { id: "p-002", name: "Ceramic Tray", price: "$24.00" },
  { id: "p-003", name: "Scented Candle", price: "$29.00" },
  { id: "p-004", name: "Minimal Desk Lamp", price: "$89.00" },
];

export function TrendingGrid() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-widest text-black/50">
            CURATED FAVORITES
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">Trending Now</h2>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-4">
          {trending.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
                <div className="h-full w-full bg-gradient-to-br from-white/60 to-black/[0.02]" />
              </div>
              <div className="mt-3 text-sm font-medium tracking-tight group-hover:underline">
                {p.name}
              </div>
              <div className="mt-1 text-xs text-black/55">{p.price}</div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
