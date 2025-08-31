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

const upsertProductSchema = z.object({
  id: z.uuid().optional(),
  name: z
    .string()
    .min(1, {
      error: "Nome é obrigatório",
    })
    .trim(),
  priceInCents: z.number().min(1, {
    error: "Preço é obrigatório",
  }),
  stock: z
    .number()
    .positive({
      message: "Estoque é obrigatório",
    })
    .min(1, {
      message: "Estoque deve ser maior que 0",
    }),
});

export { upsertProductSchema };
