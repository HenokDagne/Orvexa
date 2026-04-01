import Link from "next/link";
import { Container } from "@/components/layout/Container";

type CategoryItem = {
  label: string;
  href: string;
  count: number;
};

type ProductStub = {
  id: string;
  name: string;
  price: string;
  badge?: "NEW" | "BEST SELLER";
};

const categories: CategoryItem[] = [
  { label: "All Objects", href: "/category/all", count: 24 },
  { label: "Living", href: "/category/living", count: 42 },
  { label: "Kitchen", href: "/category/kitchen", count: 18 },
  { label: "Textiles", href: "/category/textiles", count: 17 },
  { label: "Apothecary", href: "/category/apothecary", count: 19 },
];

const products: ProductStub[] = [
  { id: "p-101", name: "Hand Wash Trio", price: "$124.00", badge: "NEW" },
  { id: "p-102", name: "Botanical Candle", price: "$89.00" },
  { id: "p-103", name: "Object: Travel Cup", price: "$210.00" },
  { id: "p-104", name: "Minimal Soap Capsule", price: "$34.00", badge: "BEST SELLER" },
  { id: "p-105", name: "High & Air Trio", price: "$72.00" },
  { id: "p-106", name: "Tool: Serving Tray", price: "$110.00" },
  { id: "p-107", name: "Botanical Cleansing Oil", price: "$38.00" },
  { id: "p-108", name: "Nesting Cotton Robes", price: "$95.00" },
  { id: "p-109", name: "Organic Cotton Towel Set", price: "$64.00" },
  { id: "p-110", name: "Bento Cutlery Set", price: "$180.00" },
  { id: "p-111", name: "Balance: Skin Study", price: "$241.00" },
  { id: "p-112", name: "Terrazzo Hand Soap", price: "$45.00" },
];

function formatSlugTitle(slug: string | string[] | undefined | null) {
  const value = Array.isArray(slug) ? slug.join(" ") : slug;
  if (typeof value !== "string") return "Category";
  const cleaned = value.replace(/[-_]+/g, " ").trim();
  if (!cleaned) return "Category";
  return cleaned
    .split(" ")
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-medium tracking-widest text-black/60 backdrop-blur">
      {label}
    </span>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-black/30" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    </div>
  );
}

export default function CategoryPage({
  params,
}: {
  params: { slug?: string | string[] };
}) {
  const title = formatSlugTitle(params?.slug);

  return (
    <div className="bg-white">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <aside>
            <div>
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                CATEGORY
              </p>
              <div className="mt-4 grid gap-2 text-sm">
                {categories.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-black/60 hover:bg-black/[0.03] hover:text-black"
                  >
                    <span className="font-medium tracking-tight">{c.label}</span>
                    <span className="text-xs text-black/40">{c.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-black/10 pt-8">
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                PRICE RANGE
              </p>
              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={500}
                  defaultValue={250}
                  className="w-full accent-black"
                  aria-label="Price range"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-black/50">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-black/10 pt-8">
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                SIZE
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="h-9 rounded-xl border border-black/10 bg-white text-xs font-medium text-black/70 hover:bg-black/[0.03]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-black/10 pt-8">
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                COLOR
              </p>
              <div className="mt-4 flex items-center gap-2">
                {["bg-black/70", "bg-black/30", "bg-black/10", "bg-white"].map(
                  (cls, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white hover:bg-black/[0.03]"
                      aria-label="Color option"
                    >
                      <span className={`h-4 w-4 rounded-full ${cls}`} />
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-black/10 pt-8">
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                RATING
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRow />
                  <span className="text-xs text-black/50">4.0+</span>
                </div>
                <button
                  type="button"
                  className="text-xs font-medium text-black/60 hover:text-black"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>

          <section>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                A curated collection of seasonal essentials, blending artisanal
                craftsmanship with contemporary silhouettes. Explore our latest
                arrivals in home, apparel, and apothecary.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="text-[10px] font-medium tracking-widest text-black/50">
                SHOWING 1–12 OF 24 PRODUCTS
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-black/50">Sort by</div>
                <select
                  className="h-9 rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                  defaultValue="featured"
                  aria-label="Sort"
                >
                  <option value="featured">Featured</option>
                  <option value="new">New</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
              {products.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
                    <div className="aspect-[4/5] w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
                    {p.badge ? (
                      <div className="absolute left-4 top-4">
                        <Badge label={p.badge} />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-3 text-sm font-medium tracking-tight text-black/80 group-hover:underline">
                    {p.name}
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-xs text-black/55">{p.price}</div>
                    <div className="text-[10px] text-black/40">4.7</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 text-xs text-black/60">
              <button type="button" className="hover:text-black">
                ← Previous
              </button>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={
                      "grid h-8 w-8 place-items-center rounded-full border border-black/10 " +
                      (n === 1
                        ? "bg-black text-white"
                        : "bg-white text-black/70 hover:bg-black/[0.03]")
                    }
                    aria-current={n === 1 ? "page" : undefined}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button type="button" className="hover:text-black">
                Next →
              </button>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
