export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10 animate-pulse">
			<div className="h-10 w-56 rounded bg-black/5" />
			<div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
				<div className="grid gap-6">
					<div className="h-28 rounded-2xl bg-black/5" />
					<div className="h-28 rounded-2xl bg-black/5" />
				</div>
				<div className="h-72 rounded-2xl bg-black/5" />
			</div>
			<div className="mt-16 h-6 w-40 rounded bg-black/5" />
			<div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
				<div className="h-56 rounded-2xl bg-black/5" />
				<div className="h-56 rounded-2xl bg-black/5" />
				<div className="h-56 rounded-2xl bg-black/5" />
				<div className="h-56 rounded-2xl bg-black/5" />
			</div>
		</div>
	);
}
