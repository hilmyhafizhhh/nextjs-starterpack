import { prisma } from "@/lib/prisma";
import { ProductInput } from "@/types/product.type";

export const productServices = {
  getAll: async (q?: string) =>
    await prisma.product.findMany({
      where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
    }),
  create: async (data: ProductInput) =>
    await prisma.product.create({
      data,
    }),
  update: async (id: string, data: ProductInput) =>
    await prisma.product.update({
      where: { id },
      data,
    }),
  delete: async (id: string) =>
    await prisma.product.delete({
      where: {
        id,
      },
    }),
};
