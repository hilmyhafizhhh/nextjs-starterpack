"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export const ProductSearch = () => {
  const q = useSearchParams().get("q") ?? "";

  return (
    <form action="" role="search" className="relative w-full sm:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        key={q}
        name="q"
        type="search"
        defaultValue={q}
        placeholder="Search products..."
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-9 text-sm text-foreground shadow-xs outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
      />

      {q && (
        <Link
          href="/products"
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </Link>
      )}
    </form>
  );
};
