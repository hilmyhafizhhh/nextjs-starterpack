import { PackageOpen, SearchX } from "lucide-react";
import Link from "next/link";
import { ProductAddForm } from "./product-add-form";
import { ProductTable } from "./product-table";
import { productServices } from "@/services/product";
import { connection } from "next/server";

export async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  await connection(); // wajib sebelum query Prisma
  const products = await productServices.getAll(q);
  const query = q?.trim();
  const isSearching = Boolean(query);

  return (
    <>
      {isSearching && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-2.5 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {products.length}
            </span>{" "}
            {products.length === 1 ? "result" : "results"} for{" "}
            <span className="rounded-md bg-background px-1.5 py-0.5 font-medium text-foreground ring-1 ring-border">
              {query}
            </span>
          </p>
          <Link
            href="/products"
            className="shrink-0 text-xs font-medium text-primary transition hover:opacity-80"
          >
            Clear search
          </Link>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Product List
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isSearching
                ? `Showing ${products.length} matching products`
                : `Showing ${products.length} active products in your store`}
            </p>
          </div>
          <ProductAddForm />
        </div>

        {products.length > 0 && <ProductTable products={products} />}

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              {isSearching ? (
                <SearchX className="size-6" />
              ) : (
                <PackageOpen className="size-6" />
              )}
            </div>

            <p className="text-sm font-semibold text-foreground">
              {isSearching ? "No matching products" : "No products found"}
            </p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              {isSearching
                ? `Nothing matched "${query}". Try a different keyword or clear the search.`
                : "Get started by creating your first product to manage your store inventory seamlessly."}
            </p>
            {isSearching && (
              <Link
                href="/products"
                className="mt-4 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
              >
                Clear search
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
