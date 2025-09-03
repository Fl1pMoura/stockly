import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product, Sales } from "@/generated/prisma";

export interface SalesDto extends Sales {
  products: Product[];
}

export const getSales = async () => {
  const sales = await db.sales.findMany({
    include: {
      SalesToProduct: {
        include: {
          product: true,
        },
      },
    },
  });
  return sales;
};
