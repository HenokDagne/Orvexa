import Link from "next/link";

type Order = {
	id: string;
	name: string;
	meta: string;
	total: string;
	status: "SHIPPED" | "PROCESSING" | "DELIVERED";
};

const recentOrders: Order[] = [
	{
		id: "o-1001",
		name: "Silk Midi Blouse + 2 items",
		meta: "ORDER #1001 · PLACED Apr 12, 2025",
		total: "$342.00",
		status: "SHIPPED",
	},
	{
		id: "o-1002",
		name: "Architectural Wool Coat",
		meta: "ORDER #1002 · PLACED Mar 28, 2025",
		total: "$980.00",
		status: "DELIVERED",
	},
	{
		id: "o-1003",
		name: "Ceramic Home Set",
		meta: "ORDER #1003 · PLACED Feb 07, 2025",
		total: "$125.00",
		status: "PROCESSING",
	},
];

function NavItem({
	href,
	label,
	active,
}: {
	href: string;
	label: string;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			className={
				"flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium tracking-tight " +
				(active
					? "bg-black/[0.03] text-black"
					: "text-black/60 hover:bg-black/[0.03] hover:text-black")
			}
		>
			<span>{label}</span>
		</Link>
	);
}

function StatusPill({ status }: { status: Order["status"] }) {
	return (
		<span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-medium tracking-widest text-black/50">
			{status}
		</span>
	);
}

export default function AccountProfilePage() {
	return (
		<div className="bg-white">
			<div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
				<aside>
					<div className="text-sm font-semibold tracking-tight">My Account</div>

					<nav className="mt-5 grid gap-1">
						<NavItem href="/account/profile" label="Profile" active />
						<NavItem href="/account/orders" label="Orders" />
						<NavItem href="/wishlist" label="Wishlist" />
						<NavItem href="/account" label="Addresses" />
						<NavItem href="/account" label="Payment" />
						<Link
							href="/auth"
							className="mt-2 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium tracking-tight text-black/60 hover:bg-black/[0.03] hover:text-black"
						>
							Log out
						</Link>
					</nav>
				</aside>

				<section>
					<div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
						<div>
							<div className="text-[10px] font-medium tracking-widest text-black/40">
								MEMBER SINCE 2021
							</div>
							<h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
								Personal Information
							</h1>
						</div>

						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white hover:bg-black/90"
						>
							Save Changes
						</button>
					</div>

					<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
						<div className="rounded-2xl border border-black/10 bg-white p-6">
							<div className="grid gap-5">
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<label className="text-[10px] font-medium tracking-widest text-black/50">
											FIRST NAME
										</label>
										<input
											className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
											defaultValue="Julianne"
										/>
									</div>
									<div>
										<label className="text-[10px] font-medium tracking-widest text-black/50">
											LAST NAME
										</label>
										<input
											className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
											defaultValue="Moore"
										/>
									</div>
								</div>

								<div>
									<label className="text-[10px] font-medium tracking-widest text-black/50">
										EMAIL ADDRESS
									</label>
									<input
										type="email"
										className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
										defaultValue="juli@example.com"
									/>
								</div>

								<div>
									<label className="text-[10px] font-medium tracking-widest text-black/50">
										PHONE NUMBER
									</label>
									<input
										type="tel"
										className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
										defaultValue="+1 (555) 000-0000"
									/>
								</div>
							</div>
						</div>

						<div className="grid gap-6">
							<div className="rounded-2xl border border-black/10 bg-white p-6">
								<div className="flex items-center justify-between">
									<div className="text-[10px] font-medium tracking-widest text-black/50">
										SECURITY
									</div>
									<button
										type="button"
										className="text-xs font-medium text-black/60 hover:text-black"
									>
										Update
									</button>
								</div>
								<div className="mt-4">
									<div className="text-sm font-medium tracking-tight text-black/80">
										Password
									</div>
									<div className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-black/[0.02]" />
								</div>
							</div>

							<div className="rounded-2xl border border-black/10 bg-white p-6">
								<div className="text-[10px] font-medium tracking-widest text-black/50">
									COMMUNICATION PREFERENCES
								</div>
								<div className="mt-4 grid gap-3 text-sm text-black/60">
									<label className="flex items-start gap-3">
										<input
											type="checkbox"
											className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
											defaultChecked
										/>
										<div>
											<div className="font-medium tracking-tight text-black/70">
												Order updates
											</div>
											<div className="text-xs text-black/45">
												Shipping and delivery notifications.
											</div>
										</div>
									</label>

									<label className="flex items-start gap-3">
										<input
											type="checkbox"
											className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
											defaultChecked
										/>
										<div>
											<div className="font-medium tracking-tight text-black/70">
												New arrivals
											</div>
											<div className="text-xs text-black/45">
												Early access and product drops.
											</div>
										</div>
									</label>

									<label className="flex items-start gap-3">
										<input
											type="checkbox"
											className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
										/>
										<div>
											<div className="font-medium tracking-tight text-black/70">
												Studio newsletter
											</div>
											<div className="text-xs text-black/45">
												Editorial stories and inspiration.
											</div>
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-10">
						<div className="flex items-end justify-between">
							<div className="text-sm font-semibold tracking-tight">
								Recent Orders
							</div>
							<Link
								href="/account/orders"
								className="text-xs font-medium text-black/60 hover:text-black"
							>
								View all orders
							</Link>
						</div>

						<div className="mt-4 grid gap-3">
							{recentOrders.map((o) => (
								<div
									key={o.id}
									className="grid grid-cols-[52px_1fr_auto] items-center gap-4 rounded-2xl border border-black/10 bg-white p-4"
								>
									<div className="overflow-hidden rounded-xl border border-black/10 bg-black/[0.03]">
										<div className="aspect-square w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
									</div>

									<div className="min-w-0">
										<div className="truncate text-sm font-medium tracking-tight text-black/80">
											{o.name}
										</div>
										<div className="mt-1 text-[10px] font-medium tracking-widest text-black/40">
											{o.meta}
										</div>
									</div>

									<div className="flex items-center gap-3">
										<div className="text-right">
											<div className="text-sm font-medium text-black/70">
												{o.total}
											</div>
											<div className="mt-2">
												<StatusPill status={o.status} />
											</div>
										</div>
										<button
											type="button"
											className="inline-flex h-9 items-center justify-center rounded-xl border border-black/10 bg-white px-3 text-xs font-medium tracking-widest text-black/70 hover:bg-black/[0.03]"
										>
											Details
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
