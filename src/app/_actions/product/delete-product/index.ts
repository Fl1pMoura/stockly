"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { deleteProductSchema } from "./schema";

export const deleteProduct = async (
  data: z.infer<typeof deleteProductSchema>,
) => {
  await db.product.delete({
    where: {
      id: data.id,
    },
  });
  revalidatePath("/products");
};
