export default function WishlistPage() {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
			<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
			</div>
		</div>
	);
}
