export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8" aria-busy="true" aria-label="Loading inventory">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-surface-2" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>
      <div className="mt-6 h-72 animate-pulse rounded-lg border border-border bg-surface" />
    </main>
  );
}
