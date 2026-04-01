import Link from "next/link";
import { Container } from "@/components/layout/Container";

type SearchParams = { q?: string | string[] };

type ProductStub = {
	id: string;
	name: string;
	price: string;
	badge?: "SALE" | "NEW";
};

const products: ProductStub[] = [
	{ id: "p-s1", name: "Korsa Lounge Chair", price: "$250.00" },
	{ id: "p-s2", name: "Bloom Armchair", price: "$1,250.00", badge: "SALE" },
	{ id: "p-s3", name: "Mola Dining Chair", price: "$231.00" },
	{ id: "p-s4", name: "Oak Rocker", price: "$540.00" },
	{ id: "p-s5", name: "Nero Counter Stool", price: "$235.00", badge: "NEW" },
	{ id: "p-s6", name: "Cloud Accent Chair", price: "$720.00" },
	{ id: "p-s7", name: "Korsa Lounge V2", price: "$1,100.00" },
	{ id: "p-s8", name: "Velvet Royal Slipper", price: "$980.00" },
];

function getQuery(searchParams?: SearchParams) {
	const q = searchParams?.q;
	const value = Array.isArray(q) ? q[0] : q;
	return typeof value === "string" && value.trim() ? value.trim() : "Modern Chair";
}

function Chip({ label, active }: { label: string; active?: boolean }) {
	return (
		<button
			type="button"
			className={
				"h-9 rounded-full border px-4 text-xs font-medium tracking-widest " +
				(active
					? "border-black bg-black text-white"
					: "border-black/10 bg-white text-black/60 hover:bg-black/[0.03]")
			}
			aria-pressed={active ? true : undefined}
		>
			{label}
		</button>
	);
}

function Badge({ label }: { label: string }) {
	return (
		<span className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-medium tracking-widest text-black/60 backdrop-blur">
			{label}
		</span>
	);
}

export default function SearchPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const query = getQuery(searchParams);

	return (
		<div className="bg-white">
			<Container className="py-10">
				<div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
					<aside>
						<div className="text-[10px] font-medium tracking-widest text-black/50">
							REFINE BY
						</div>

						<div className="mt-6 border-t border-black/10 pt-6">
							<div className="text-[10px] font-medium tracking-widest text-black/50">
								MATERIAL
							</div>
							<div className="mt-4 grid gap-2 text-sm text-black/60">
								{["Wood", "Solid wood", "Leather", "Textile", "Metal"].map((m) => (
									<label key={m} className="flex items-center gap-3">
										<input type="checkbox" className="h-4 w-4 rounded border-black/20 accent-black" />
										<span className="font-medium tracking-tight">{m}</span>
									</label>
								))}
							</div>
						</div>

						<div className="mt-6 border-t border-black/10 pt-6">
							<div className="text-[10px] font-medium tracking-widest text-black/50">
								PRICE RANGE
							</div>
							<div className="mt-4">
								<input type="range" min={0} max={2000} defaultValue={900} className="w-full accent-black" aria-label="Price range" />
								<div className="mt-3 flex items-center justify-between text-xs text-black/50">
									<span>$0</span>
									<span>$2,000+</span>
								</div>
							</div>
						</div>

						<div className="mt-6 border-t border-black/10 pt-6">
							<div className="text-[10px] font-medium tracking-widest text-black/50">
								DESIGNER
							</div>
							<div className="mt-4 grid gap-2 text-sm text-black/60">
								{["Atelier Sol", "Noir Studio"].map((d) => (
									<label key={d} className="flex items-center gap-3">
										<input type="checkbox" className="h-4 w-4 rounded border-black/20 accent-black" />
										<span className="font-medium tracking-tight">{d}</span>
									</label>
								))}
							</div>
						</div>

						<div className="mt-6 border-t border-black/10 pt-6">
							<div className="text-[10px] font-medium tracking-widest text-black/50">
								AVAILABILITY
							</div>
							<div className="mt-4 grid gap-2 text-sm text-black/60">
								{["In stock", "On sale"].map((a) => (
									<label key={a} className="flex items-center gap-3">
										<input type="checkbox" className="h-4 w-4 rounded border-black/20 accent-black" />
										<span className="font-medium tracking-tight">{a}</span>
									</label>
								))}
							</div>

							<div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
								<div className="text-sm font-semibold tracking-tight text-black/80">
									Need advice?
								</div>
								<div className="mt-2 text-sm leading-6 text-black/60">
									We can help you find the right fit.
								</div>
								<button
									type="button"
									className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-medium tracking-widest text-black/70 hover:bg-black/[0.03]"
								>
									BOOK A STYLIST
								</button>
							</div>
						</div>
					</aside>

					<section>
						<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
							<div>
								<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
									Showing results for “{query}”
								</h1>
								<p className="mt-3 text-sm leading-6 text-black/60">
									Found {products.length} curated results. Refine your filters to
									narrow your search.
								</p>
							</div>

							<div className="flex flex-col items-start gap-4 md:items-end">
								<div className="flex flex-wrap items-center gap-2">
									<Chip label="ALL" active />
									<Chip label="STOOLS" />
									<Chip label="DECOR" />
									<Chip label="RUG" />
								</div>

								<div className="flex items-center gap-3">
									<div className="text-xs text-black/50">Show</div>
									<select className="h-9 rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70" defaultValue="12" aria-label="Show">
										<option value="12">12</option>
										<option value="24">24</option>
										<option value="48">48</option>
									</select>

									<div className="text-xs text-black/50">Sort</div>
									<select className="h-9 rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70" defaultValue="featured" aria-label="Sort">
										<option value="featured">Featured</option>
										<option value="new">New</option>
										<option value="price-asc">Price: Low to High</option>
										<option value="price-desc">Price: High to Low</option>
									</select>

									<div className="text-xs text-black/50">View</div>
									<button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 hover:bg-black/[0.03]" aria-label="Grid view">
										▦
									</button>
									<button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 hover:bg-black/[0.03]" aria-label="List view">
										≡
									</button>
								</div>
							</div>
						</div>

						<div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
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
									<div className="mt-1 text-xs text-black/55">{p.price}</div>
								</Link>
							))}
						</div>

						<div className="mt-12 flex items-center justify-center gap-2 text-xs text-black/60">
							<button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white hover:bg-black/[0.03]" aria-label="Previous page">
								‹
							</button>
							{[1, 2, 3].map((n) => (
								<button
									key={n}
									type="button"
									className={
										"grid h-9 w-9 place-items-center rounded-full border border-black/10 " +
										(n === 1 ? "bg-black text-white" : "bg-white hover:bg-black/[0.03]")
									}
									aria-current={n === 1 ? "page" : undefined}
								>
									{n}
								</button>
							))}
							<span className="px-2 text-black/40">…</span>
							<button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white hover:bg-black/[0.03]" aria-label="Next page">
								›
							</button>
						</div>
					</section>
				</div>
			</Container>
		</div>
	);
}
