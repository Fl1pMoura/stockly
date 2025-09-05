import { z } from "zod";

// model Product {
//   id        String   @id @default(uuid())
//   name      String
//   price     Decimal  @db.Decimal(10, 2)
//   stock     Int
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   SalesToProduct SalesToProduct[]
// }

export const upsertSalesSchema = z.object({
  products: z.array(
    z.object({
      id: z.uuid({
        error: "Produto é obrigatório",
      }),
      quantity: z.number().positive({
        error: "Quantidade é obrigatória",
      }),
    }),
  ),
});

export type UpsertSalesSchema = z.infer<typeof upsertSalesSchema>;
