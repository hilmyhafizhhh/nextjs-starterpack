import { Fragment, Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductList } from "@/components/products/product-list";
import { ProductSearch } from "@/components/products/product-search";
import { ProductListSkeleton } from "@/components/products/product-list-skeleton";

export const metadata: Metadata = {
  title: "Product CRUD Demo | Next.js Starter Pack",
  description:
    "Live demo of the full flow: form, validation, server action, service, and Prisma.",
};

const flow = ["React Hook Form", "Zod", "Server Action", "Service", "Prisma"];

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <header className="mb-8 space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Live demo
            </span>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Product CRUD
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Example of a complete flow in this starter. Add, search, and
              delete products. Data is stored in your local PostgreSQL.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {flow.map((step, i) => (
              <Fragment key={step}>
                <span className="rounded-md border bg-card px-2 py-1 font-medium text-foreground">
                  {step}
                </span>
                {i < flow.length - 1 && <ArrowRight className="size-3.5" />}
              </Fragment>
            ))}
          </div>
        </header>

        <div className="mb-4">
          <Suspense
            fallback={
              <div className="h-10 w-full rounded-lg border border-border bg-card shadow-xs sm:max-w-sm" />
            }
          >
            <ProductSearch />
          </Suspense>
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
