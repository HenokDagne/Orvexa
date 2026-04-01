type Params = { id: string };

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { id } = await params;

	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<h1 className="text-2xl font-semibold tracking-tight">Product: {id}</h1>
			<div className="mt-6 h-80 w-full rounded bg-black/5" />
		</div>
	);
}
