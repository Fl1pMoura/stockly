import { deleteProduct } from "@/app/_actions/product/delete-product";
import { deleteProductSchema } from "@/app/_actions/product/delete-product/schema";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import z from "zod";

const DeleteProductDialog = ({ id }: z.infer<typeof deleteProductSchema>) => {
  const handleDelete = async () => {
    await deleteProduct({
      id,
    });
    toast.success("Produto excluído com sucesso");
  };
  return (
    <AlertDialogContent>
      <AlertDialogTitle>
        Tem certeza que deseja excluir este produto?
      </AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
      <AlertDialogFooter className="flex items-center justify-between">
        <AlertDialogCancel className="w-1/2">Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-1/2"
          >
            Excluir
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialog;
