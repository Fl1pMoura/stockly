"use server";
import { revalidatePath } from "next/cache";
import z from "zod";
import { upsertSalesSchema } from "./schema";

export const upsertSales = async (data: z.infer<typeof upsertSalesSchema>) => {
  revalidatePath("/sales");
};
