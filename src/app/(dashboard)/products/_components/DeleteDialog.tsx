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

const DeleteProductDialog = () => {
  const handleDelete = async () => {
    console.log("Excluir");
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
