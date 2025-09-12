import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@/generated/prisma";
import { Omit } from "@/generated/prisma/runtime/library";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "priceInCents"> {
  priceInCents: number;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });
  return products.map((product) => ({
    ...product,
    priceInCents: product.priceInCents / 100,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
