"use client";

import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductInput } from "@/types/product.type";
import { ProductSchema } from "@/schemas/product.schema";
import { updateProductAction } from "@/app/products/action";
import { showToast } from "./show-toast";

export const ProductEditForm = ({ product }: { product: Product }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formId = `form-edit-product-${product.id}`;
  const nameId = `product-name-${product.id}`;
  const priceId = `product-price-${product.id}`;
  const stockId = `product-stock-${product.id}`;

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.stock,
    },
  });

  const onSubmit = (id: string, data: ProductInput) => {
    startTransition(async () => {
      try {
        const result = await updateProductAction(id, data);
        if (!result.success) throw new Error(result.error);

        setOpen(false);
        reset({
          name: data.name,
          price: data.price,
          stock: data.stock,
        });
        showToast("success", "Product successfully updated.");
        router.refresh();
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to update product.",
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          reset({
            name: product.name,
            price: product.price,
            stock: product.stock,
          });
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <Pencil className="mr-1.5 size-3.5" />
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-110">
        <form
          id={formId}
          onSubmit={handleSubmit((data) => onSubmit(product.id, data))}
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Edit product
            </DialogTitle>

            <DialogDescription className="text-sm leading-5">
              Update the product details. Changes apply immediately after
              saving.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6 gap-5">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor={nameId}>
                    Product
                    <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={nameId}
                    placeholder="e.g. Wireless Mouse"
                    autoComplete="off"
                  />

                  <FieldDescription>
                    Enter a clear and recognizable product name.
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="price"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor={priceId}>
                      Price
                      <span className="text-destructive">*</span>
                    </Label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                        Rp
                      </span>

                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        value={Number.isNaN(field.value) ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        id={priceId}
                        type="number"
                        placeholder="0"
                        min="0"
                        className="pl-10"
                      />
                    </div>

                    <FieldDescription>Product selling price.</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="stock"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor={stockId}>
                      Stock
                      <span className="text-destructive">*</span>
                    </Label>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      value={Number.isNaN(field.value) ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      id={stockId}
                      type="number"
                      placeholder="0"
                      min="0"
                    />

                    <FieldDescription>Available inventory.</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <DialogFooter className="mt-8 gap-2 sm:gap-2">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button type="submit" form={formId} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
