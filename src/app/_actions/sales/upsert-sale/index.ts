"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { sleep } from "@/app/_lib/utils";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { upsertSalesSchema } from "./schema";

export const upsertSales = actionClient
  .inputSchema(upsertSalesSchema)
  .action(async ({ parsedInput: { products } }) => {
    sleep(2000);
    await db.$transaction(async (tx) => {
      const sale = await tx.sales.create({
        data: {},
      });
      for (const product of products) {
        const productData = await tx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productData) {
          returnValidationErrors(upsertSalesSchema, {
            _errors: ["Produto não encontrado"],
          });
        }

        const productIsOutStock = product.quantity > productData.stock;

        if (productIsOutStock) {
          returnValidationErrors(upsertSalesSchema, {
            _errors: ["Produto sem estoque"],
          });
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
  });
