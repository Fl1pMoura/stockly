import "server-only";

import { db } from "@/app/_lib/prisma";
import { Sales } from "@/generated/prisma";

export interface SalesDto extends Sales {
  productNames: string;
  totalProducts: number;
  totalAmount: number;
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sales.findMany({
    include: {
      SalesToProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    productNames: sale.SalesToProduct.map((item) => item.product.name).join(
      ", ",
    ),
    totalProducts: sale.SalesToProduct.reduce(
      (acc, cur) => acc + cur.quantity,
      0,
    ),
    totalAmount: sale.SalesToProduct.reduce(
      (acc, cur) => acc + (cur.quantity * cur.product.priceInCents) / 100,
      0,
    ),
    createdAt: sale.createdAt,
    updatedAt: sale.updatedAt,
  }));
};
