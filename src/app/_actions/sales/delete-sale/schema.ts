import { z } from "zod";

const deleteSaleSchema = z.object({
  id: z.uuid({
    error: "Id é obrigatório",
  }),
});

export { deleteSaleSchema };
