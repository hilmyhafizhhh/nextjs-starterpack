import z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters."),
  price: z
    .number({ error: "Price is required" })
    .int("Price must be a whole number.")
    .positive("Price must be greater than 0."),
  stock: z
    .number({ error: "Stock is required" })
    .int("Stock must be an integer.")
    .min(0, "Stock cannot be negative."),
});
