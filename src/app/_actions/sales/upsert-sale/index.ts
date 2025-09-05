"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertSalesSchema, UpsertSalesSchema } from "./schema";

export const upsertSales = async (data: UpsertSalesSchema) => {
  upsertSalesSchema.parse(data);
  await db.$transaction(async (tx) => {
    const sale = await tx.sales.create({
      data: {},
    });
    for (const product of data.products) {
      const productData = await tx.product.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!productData) {
        throw new Error("Produto não encontrado");
      }

      const productIsOutStock = product.quantity > productData.stock;

      if (productIsOutStock) {
        throw new Error("Produto sem estoque");
      }

      await tx.salesToProduct.create({
        data: {
          salesId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPriceInCents: productData.priceInCents,
          totalPriceInCents: productData.priceInCents * product.quantity,
        },
      });
    }
  });
  revalidatePath("/sales");
};
