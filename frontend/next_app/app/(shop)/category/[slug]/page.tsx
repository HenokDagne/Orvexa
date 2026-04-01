export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Category: {params.slug}
      </h1>
    </div>
  );
}
