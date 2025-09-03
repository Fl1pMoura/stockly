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

const upsertSalesSchema = z.object({
  productId: z.uuid({
    error: "Produto é obrigatório",
  }),
  quantity: z.coerce.number<number>().min(1, {
    error: "Quantidade é obrigatória",
  }),
});

export { upsertSalesSchema };
