"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ProductEditForm } from "./product-edit-form";
import { useRouter } from "next/navigation";
import { showToast } from "./show-toast";
import { Product } from "@/types/product.type";
import { deleteProductAction } from "@/app/products/action";

export const ProductTable = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const handleDelete = (id: string) => {
    setTransition(async () => {
      try {
        const result = await deleteProductAction(id);
        if (!result.success) throw new Error(result.error);
        showToast("success", "Product successfully deleted.");
        router.refresh();
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to delete product.",
        );
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-6 py-3.5">Product</th>
            <th className="px-6 py-3.5">Price</th>
            <th className="px-6 py-3.5">Stock</th>
            <th className="px-6 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => {
            const inStock = product.stock > 0;
            return (
              <tr
                key={product.id}
                className="transition-colors hover:bg-muted/40"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    ID: {product.id}
                  </p>
                </td>

                <td className="px-6 py-4 font-medium tabular-nums text-foreground">
                  Rp{product.price.toLocaleString("id-ID")}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                      inStock
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        inStock ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    {inStock ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <ProductEditForm product={product} />

                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2.5 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="mr-1.5 size-3.5" />
                            Delete
                          </Button>
                        }
                      />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete product?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-semibold text-foreground">
                              {product.name}
                            </span>{" "}
                            from your products inventory.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id)}
                            disabled={isPending}
                            className="bg-destructive text-white hover:bg-destructive/90"
                          >
                            {isPending ? (
                              <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
