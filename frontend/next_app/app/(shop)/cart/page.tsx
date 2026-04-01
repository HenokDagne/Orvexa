import Link from "next/link";
import { Container } from "@/components/layout/Container";

type CartItem = {
	id: string;
	name: string;
	meta: string;
	price: number;
	quantity: number;
};

const cartItems: CartItem[] = [
	{
		id: "c-001",
		name: "Sculpted Wool Overcoat",
		meta: "COLOR: CHARCOAL · SIZE: M",
		price: 485,
		quantity: 1,
	},
	{
		id: "c-002",
		name: "Essential Overshirt Tee",
		meta: "COLOR: SOFT GREY · SIZE: S",
		price: 65,
		quantity: 2,
	},
];

const curated = [
	{ id: "p-c1", name: "Structured Tote Bag", price: "$210.00", badge: "NEW" as const },
	{ id: "p-c2", name: "Orbit Earrings", price: "$145.00" },
	{ id: "p-c3", name: "Flora Silk Scarf", price: "$180.00" },
	{ id: "p-c4", name: "Heavy Knit Cashmere", price: "$275.00", badge: "CURATED" as const },
];

function money(value: number) {
	return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function Badge({ label }: { label: string }) {
	return (
		<span className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-medium tracking-widest text-black/60 backdrop-blur">
			{label}
		</span>
	);
}

export default function CartPage() {
	const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const shipping = 0;
	const estimatedTax = Math.round(subtotal * 0.0825 * 100) / 100;
	const total = subtotal + shipping + estimatedTax;

	return (
		<div className="bg-white">
			<Container className="py-10">
				<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
					Shopping Bag
				</h1>

				<div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
					<section>
						<div className="grid gap-6">
							{cartItems.map((item) => (
								<div key={item.id} className="grid grid-cols-[72px_1fr_auto] gap-4 rounded-2xl border border-black/10 bg-white p-4">
									<div className="overflow-hidden rounded-xl border border-black/10 bg-black/[0.03]">
										<div className="aspect-square w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
									</div>

									<div className="min-w-0">
										<div className="flex items-start justify-between gap-4">
											<div className="min-w-0">
												<div className="truncate text-sm font-semibold tracking-tight text-black/80">
													{item.name}
												</div>
												<div className="mt-1 text-[10px] font-medium tracking-widest text-black/40">
													{item.meta}
												</div>
											</div>
											<div className="text-sm font-medium text-black/70">
												{money(item.price)}
											</div>
										</div>

										<div className="mt-4 flex flex-wrap items-center gap-3">
											<div className="rounded-xl border border-black/10 bg-white p-1">
												<div className="grid grid-cols-3 items-center">
													<button type="button" className="h-9 rounded-lg text-sm text-black/60 hover:bg-black/[0.03]" aria-label="Decrease quantity">
														−
													</button>
													<div className="text-center text-sm font-medium text-black/70">
														{item.quantity}
													</div>
													<button type="button" className="h-9 rounded-lg text-sm text-black/60 hover:bg-black/[0.03]" aria-label="Increase quantity">
														+
													</button>
												</div>
											</div>

											<button type="button" className="text-xs font-medium text-black/50 hover:text-black">
												Save for later
											</button>
										</div>
									</div>

									<button type="button" className="h-10 w-10 rounded-xl border border-black/10 bg-white text-black/50 hover:bg-black/[0.03]" aria-label="Remove item">
										×
									</button>
								</div>
							))}
						</div>
					</section>

					<aside>
						<div className="rounded-2xl border border-black/10 bg-white p-6">
							<div className="text-sm font-semibold tracking-tight">Order Summary</div>

							<div className="mt-5 grid gap-3 text-sm">
								<div className="flex items-center justify-between text-black/60">
									<span>Subtotal</span>
									<span className="text-black/70">{money(subtotal)}</span>
								</div>
								<div className="flex items-center justify-between text-black/60">
									<span>Shipping</span>
									<span className="text-black/70">{shipping === 0 ? "Calculated at checkout" : money(shipping)}</span>
								</div>
								<div className="flex items-center justify-between text-black/60">
									<span>Estimated tax</span>
									<span className="text-black/70">{money(estimatedTax)}</span>
								</div>

								<div className="mt-3">
									<div className="text-[10px] font-medium tracking-widest text-black/50">
										PROMO CODE
									</div>
									<div className="mt-2 flex items-center gap-2">
										<input
											type="text"
											placeholder="Enter code"
											className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70 placeholder:text-black/30"
										/>
										<button type="button" className="h-10 rounded-xl border border-black/10 bg-white px-4 text-xs font-medium tracking-widest text-black/70 hover:bg-black/[0.03]">
											APPLY
										</button>
									</div>
								</div>
							</div>

							<div className="mt-6 border-t border-black/10 pt-5">
								<div className="flex items-center justify-between">
									<div className="text-[10px] font-medium tracking-widest text-black/50">
										TOTAL
									</div>
									<div className="text-lg font-semibold tracking-tight">
										{money(total)}
									</div>
								</div>

								<button
									type="button"
									className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
								>
									Checkout now
								</button>

								<div className="mt-4 flex items-center justify-between text-[10px] font-medium tracking-widest text-black/40">
									<span>SECURE PAYMENT</span>
									<span>FREE RETURNS</span>
								</div>
							</div>
						</div>
					</aside>
				</div>

				<div className="mt-16 border-t border-black/10 pt-10">
					<div className="flex items-end justify-between">
						<div>
							<div className="text-sm font-semibold tracking-tight">Curated for You</div>
							<div className="mt-2 text-sm text-black/60">
								Suggested pieces based on your cart.
							</div>
						</div>
						<Link href="/search" className="text-xs font-medium text-black/60 hover:text-black">
							DISCOVER BEST SELLERS
						</Link>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
						{curated.map((p) => (
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
				</div>
			</Container>
		</div>
	);
}
