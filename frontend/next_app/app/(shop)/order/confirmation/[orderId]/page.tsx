type Params = { orderId: string };

export default async function OrderConfirmationPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { orderId } = await params;

	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-10">
			<h1 className="text-2xl font-semibold tracking-tight">
				Order confirmed
			</h1>
			<p className="mt-2 text-sm text-black/60">Order ID: {orderId}</p>
			<div className="mt-6 h-40 w-full rounded bg-black/5" />
		</div>
	);
}
