"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

export const upsertProduct = actionClient
  .inputSchema(upsertProductSchema)
  .action(async ({ parsedInput: { id, name, priceInCents, stock } }) => {
    await db.product.upsert({
      where: {
        id: id ?? "",
      },
      update: {
        name,
        priceInCents,
        stock,
      },
      create: {
        name,
        priceInCents,
        stock,
      },
    });
    revalidatePath("/products");
  });
