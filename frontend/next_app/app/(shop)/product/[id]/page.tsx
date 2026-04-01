import Link from "next/link";
import { Container } from "@/components/layout/Container";

type Params = { id?: string | string[] };

type Review = {
	id: string;
	name: string;
	date: string;
	rating: number;
	body: string;
};

function getId(paramsId: Params["id"]) {
	if (Array.isArray(paramsId)) return paramsId[0];
	return paramsId;
}

function Stars({ rating }: { rating: number }) {
	const full = Math.max(0, Math.min(5, Math.round(rating)));
	return (
		<div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<span
					key={i}
					className={
						"inline-block h-2.5 w-2.5 rounded-full " +
						(i < full ? "bg-black/70" : "bg-black/10")
					}
					aria-hidden="true"
				/>
			))}
		</div>
	);
}

function Chevron() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			className="text-black/40"
		>
			<path
				d="M7 10l5 5 5-5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function ProductDetailPage({ params }: { params: Params }) {
	const id = getId(params?.id) ?? "p-001";

	const product = {
		id,
		name: "The Celestial Overshirt",
		price: "$425.00",
		rating: 4.8,
		reviewCount: 124,
	};

	const reviews: Review[] = [
		{
			id: "r1",
			name: "Elena G.",
			date: "Oct 10, 2025",
			rating: 5,
			body:
				"The quality of the wool is beyond anything I’ve purchased before. It feels incredibly substantial yet breathable. Shipping was fast, and the fit is just right — an instant everyday layer.",
		},
		{
			id: "r2",
			name: "Amal N.",
			date: "Sep 18, 2025",
			rating: 4,
			body:
				"Perfect tailoring, subtle style, and the fabric drapes nicely. Shipping took slightly longer than expected but the packaging was thoughtful and secure.",
		},
	];

	const related = [
		{ id: "p-201", name: "Pleated Trousers", price: "$168.00" },
		{ id: "p-202", name: "City Blazer", price: "$395.00" },
		{ id: "p-203", name: "Poplin Essential", price: "$120.00" },
		{ id: "p-204", name: "Modern Coat", price: "$520.00" },
	];

	return (
		<div className="bg-white">
			<Container className="py-10">
				<div className="text-[10px] font-medium tracking-widest text-black/40">
					<Link href="/" className="hover:text-black">
						HOME
					</Link>
					<span className="mx-2">/</span>
					<Link href="/category/new" className="hover:text-black">
						NEW ARRIVALS
					</Link>
					<span className="mx-2">/</span>
					<span className="text-black/60">THE CELESTIAL OVERSHIRT</span>
				</div>

				<div className="mt-6 grid gap-10 lg:grid-cols-[1fr_420px]">
					<div className="grid gap-6 md:grid-cols-[72px_1fr]">
						<div className="order-2 flex gap-3 md:order-1 md:flex-col">
							{Array.from({ length: 4 }).map((_, idx) => (
								<button
									key={idx}
									type="button"
									className={
										"h-16 w-16 overflow-hidden rounded-xl border bg-black/[0.03] hover:bg-black/[0.04] " +
										(idx === 0 ? "border-black/30" : "border-black/10")
									}
									aria-label={`Thumbnail ${idx + 1}`}
								>
									<div className="h-full w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
								</button>
							))}
						</div>

						<div className="order-1 md:order-2">
							<div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
								<div className="aspect-[4/5] w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
							</div>
						</div>
					</div>

					<aside>
						<h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
							{product.name}
						</h1>

						<div className="mt-3 flex items-center justify-between">
							<div className="text-sm font-medium text-black/70">
								{product.price}
							</div>
							<div className="flex items-center gap-2 text-xs text-black/50">
								<Stars rating={product.rating} />
								<span>
									{product.rating.toFixed(1)} ({product.reviewCount} reviews)
								</span>
							</div>
						</div>

						<div className="mt-8">
							<div className="text-[10px] font-medium tracking-widest text-black/50">
								COLOR
							</div>
							<div className="mt-3 flex items-center gap-2">
								{["bg-black/70", "bg-black/30", "bg-white"].map((cls, idx) => (
									<button
										key={idx}
										type="button"
										className={
											"grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white hover:bg-black/[0.03] " +
											(idx === 0 ? "ring-1 ring-black/30" : "")
										}
										aria-label="Color option"
									>
										<span className={`h-4 w-4 rounded-full ${cls}`} />
									</button>
								))}
							</div>
						</div>

						<div className="mt-8">
							<div className="flex items-center justify-between">
								<div className="text-[10px] font-medium tracking-widest text-black/50">
									SELECT SIZE
								</div>
								<button
									type="button"
									className="text-xs font-medium text-black/60 hover:text-black"
								>
									Size guide
								</button>
							</div>
							<div className="mt-3 grid grid-cols-5 gap-2">
								{["XS", "S", "M", "L", "XL"].map((s) => (
									<button
										key={s}
										type="button"
										className={
											"h-10 rounded-xl border border-black/10 bg-white text-xs font-medium text-black/70 hover:bg-black/[0.03] " +
											(s === "M" ? "border-black/30" : "")
										}
									>
										{s}
									</button>
								))}
							</div>
						</div>

						<div className="mt-8">
							<div className="grid grid-cols-[120px_1fr] items-center gap-3">
								<div className="rounded-xl border border-black/10 bg-white p-1">
									<div className="grid grid-cols-3 items-center">
										<button
											type="button"
											className="h-10 rounded-lg text-sm text-black/60 hover:bg-black/[0.03]"
											aria-label="Decrease quantity"
										>
											−
										</button>
										<div className="text-center text-sm font-medium text-black/70">
											1
										</div>
										<button
											type="button"
											className="h-10 rounded-lg text-sm text-black/60 hover:bg-black/[0.03]"
											aria-label="Increase quantity"
										>
											+
										</button>
									</div>
								</div>

								<button
									type="button"
									className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
								>
									Add to cart
								</button>
							</div>

							<div className="mt-3 flex items-center justify-between">
								<div className="text-xs text-black/50">In stock</div>
								<button
									type="button"
									className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white text-black/70 hover:bg-black/[0.03]"
									aria-label="Add to wishlist"
								>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M12 21s-7-4.438-9.5-8.5C.78 9.21 2.5 6 6 6c1.8 0 3.2.9 4 2 .8-1.1 2.2-2 4-2 3.5 0 5.22 3.21 3.5 6.5C19 16.562 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
									</svg>
								</button>
							</div>
						</div>

						<div className="mt-10 grid gap-2">
							<details className="rounded-2xl border border-black/10 bg-white p-4" open>
								<summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-black/80">
									Description
									<Chevron />
								</summary>
								<div className="mt-3 text-sm leading-6 text-black/60">
									A relaxed overshirt crafted from durable, breathable fabric.
									Designed for layering with reinforced stitching and soft
									structure — minimalist details for modern wardrobes.
								</div>
							</details>

							<details className="rounded-2xl border border-black/10 bg-white p-4">
								<summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-black/80">
									Shipping & returns
									<Chevron />
								</summary>
								<div className="mt-3 text-sm leading-6 text-black/60">
									Standard shipping in 3–5 business days. Returns accepted within
									14 days in original condition.
								</div>
							</details>

							<details className="rounded-2xl border border-black/10 bg-white p-4">
								<summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-black/80">
									Q&A
									<Chevron />
								</summary>
								<div className="mt-3 text-sm leading-6 text-black/60">
									Have a question about sizing, materials, or care? We’ll add
									answers here as customers ask.
								</div>
							</details>
						</div>
					</aside>
				</div>

				<div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
					<div>
						<div className="text-sm font-semibold tracking-tight">Client Reviews</div>
						<div className="mt-6">
							<div className="text-4xl font-semibold tracking-tight">
								{product.rating.toFixed(1)}
							</div>
							<div className="mt-2 flex items-center gap-2">
								<Stars rating={product.rating} />
								<div className="text-xs text-black/50">Based on {product.reviewCount} reviews</div>
							</div>
							<div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-black/10">
								<div className="h-full w-[78%] rounded-full bg-black/70" />
							</div>
						</div>
					</div>

					<div className="grid gap-6">
						{reviews.map((r) => (
							<div key={r.id} className="rounded-2xl border border-black/10 bg-white p-6">
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-center gap-3">
										<div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-black/[0.03] text-xs font-semibold text-black/60">
											{r.name
												.split(" ")
												.map((p) => p[0])
												.join("")}
										</div>
										<div>
											<div className="text-sm font-medium tracking-tight text-black/80">
												{r.name}
											</div>
											<div className="text-xs text-black/40">{r.date}</div>
										</div>
									</div>
									<Stars rating={r.rating} />
								</div>
								<p className="mt-4 text-sm leading-6 text-black/60">{r.body}</p>
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 border-t border-black/10 pt-10">
					<div className="flex items-end justify-between">
						<div className="text-sm font-semibold tracking-tight">You Might Also Like</div>
						<Link href="/search" className="text-xs font-medium text-black/60 hover:text-black">
							Explore all
						</Link>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
						{related.map((p) => (
							<Link key={p.id} href={`/product/${p.id}`} className="group">
								<div className="aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
									<div className="h-full w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
								</div>
								<div className="mt-3 text-sm font-medium tracking-tight text-black/80 group-hover:underline">
									{p.name}
								</div>
								<div className="mt-1 text-xs text-black/55">{p.price}</div>
							</Link>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}
