import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@/generated/prisma";
import { Omit } from "@/generated/prisma/runtime/library";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "price"> {
  price: number;
  status: ProductStatusDto;
}

export const getProducts = async () => {
  const products = await db.product.findMany();
  return products.map((product) => ({
    ...product,
    price: product.priceInCents / 100,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
