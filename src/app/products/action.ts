"use server";
import { ProductSchema } from "@/schemas/product.schema";
import { productServices } from "@/services/product";
import { ProductInput } from "@/types/product.type";
import { revalidatePath } from "next/cache";

export const deleteProductAction = async (id: string) => {
  try {
    const productDeleted = await productServices.delete(id);
    revalidatePath("/");

    return { success: true, data: productDeleted };
  } catch (error) {
    console.error("Failed to delete product via action:", error);
    return { success: false, error: "Failed to delete product." };
  }
};

export const createProductAction = async (data: ProductInput) => {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const createdProduct = await productServices.create(parsed.data);
    revalidatePath("/");

    return { success: true, data: createdProduct };
  } catch (error) {
    console.error("Failed to create product via action:", error);
    return { success: false, error: "Failed to create product." };
  }
};

export const updateProductAction = async (id: string, data: ProductInput) => {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  try {
    const updatedProduct = await productServices.update(id, parsed.data);
    revalidatePath("/");

    return { success: true, data: updatedProduct };
  } catch (error) {
    console.error("Failed to create product via action:", error);
    return { success: false, error: "Failed to create product." };
  }
};
