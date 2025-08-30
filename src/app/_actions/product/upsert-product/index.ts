"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { upsertProductSchema } from "./schema";

export const upsertProduct = async (
  data: z.infer<typeof upsertProductSchema>,
) => {
  await db.product.upsert({
    where: {
      id: data.id ?? "",
    },
    update: {
      name: data.name,
      priceInCents: data.priceInCents,
      stock: data.stock,
    },
    create: {
      name: data.name,
      priceInCents: data.priceInCents,
      stock: data.stock,
    },
  });
  revalidatePath("/products");
};
