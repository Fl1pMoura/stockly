"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .inputSchema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    if (!id) {
      returnValidationErrors(deleteSaleSchema, {
        _errors: ["ID da venda é necessário"],
      });
    }
    await db.sales.delete({
      where: {
        id,
      },
    });
    revalidatePath("/sales");
  });
