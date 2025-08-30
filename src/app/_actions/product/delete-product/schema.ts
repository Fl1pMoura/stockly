import { z } from "zod";

const deleteProductSchema = z.object({
  id: z.uuid({
    error: "Id é obrigatório",
  }),
});

export { deleteProductSchema };
