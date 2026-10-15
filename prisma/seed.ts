import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products: Prisma.ProductCreateManyInput[] = [
  { name: "iPhone 17 Pro", price: 30000000, stock: 12 },
  { name: "iPhone 17 Pro Max", price: 33000000, stock: 8 },
  { name: "iPhone 17", price: 21000000, stock: 15 },
  { name: "Samsung Galaxy S26 Ultra", price: 29000000, stock: 10 },
  { name: "Google Pixel 10 Pro", price: 20000000, stock: 7 },
];

async function main() {
  await prisma.product.createMany({
    data: products,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
