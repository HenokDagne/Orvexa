export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 animate-pulse">
      <div className="h-10 w-48 rounded bg-black/5" />
      <div className="mt-5 h-6 w-80 rounded bg-black/5" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <div className="h-24 rounded-2xl bg-black/5" />
          <div className="h-96 rounded-2xl bg-black/5" />
          <div className="h-52 rounded-2xl bg-black/5" />
        </div>
        <div className="h-[520px] rounded-2xl bg-black/5" />
      </div>
    </div>
  );
}
