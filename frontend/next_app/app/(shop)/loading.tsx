export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 animate-pulse">
      <div className="h-10 w-48 rounded bg-black/5" />
      <div className="mt-6 h-64 w-full rounded bg-black/5" />
      <div className="mt-10 h-8 w-40 rounded bg-black/5" />
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="h-28 rounded bg-black/5" />
        <div className="h-28 rounded bg-black/5" />
        <div className="h-28 rounded bg-black/5" />
        <div className="h-28 rounded bg-black/5" />
      </div>
    </div>
  );
} 
	
