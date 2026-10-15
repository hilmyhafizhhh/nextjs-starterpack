export function ProductListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-56 animate-pulse rounded bg-muted/60" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-muted/60" />
            </div>
            <div className="flex items-center gap-6">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
