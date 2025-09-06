"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { deleteProductSchema } from "./schema";

export const deleteProduct = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    if (!id) {
      returnValidationErrors(deleteProductSchema, {
        _errors: ["ID do produto é necessário"],
      });
    }
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products");
  });
