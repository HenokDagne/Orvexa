export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<div className="h-8 w-40 rounded bg-black/5" />
			<div className="mt-6 h-12 w-full rounded bg-black/5" />
			<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
				<div className="h-48 rounded bg-black/5" />
			</div>
		</div>
	);
}
