export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<div className="h-8 w-40 rounded bg-black/5" />
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="h-32 rounded bg-black/5" />
				<div className="h-32 rounded bg-black/5" />
			</div>
		</div>
	);
}
