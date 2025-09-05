"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertSalesSchema, UpsertSalesSchema } from "./schema";

export const upsertSales = async (data: UpsertSalesSchema) => {
  upsertSalesSchema.parse(data);
  const sale = await db.sales.create({
    data: {},
  });
  for (const product of data.products) {
    const productData = await db.product.findUnique({
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

    await db.salesToProduct.create({
      data: {
        salesId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPriceInCents: productData.priceInCents,
        totalPriceInCents: productData.priceInCents * product.quantity,
      },
    });
  }
  revalidatePath("/sales");
};
