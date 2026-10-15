import { ProductSchema } from "@/schemas/product.schema";
import z from "zod";

export type ProductInput = z.infer<typeof ProductSchema>;

export type Product = ProductInput & {
  id: string;
};
