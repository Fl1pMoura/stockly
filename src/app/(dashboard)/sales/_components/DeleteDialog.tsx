import { deleteSale } from "@/app/_actions/sales/delete-sale";
import Spinner from "@/app/_components/Spinner";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const DeleteProductDialog = ({ id }: { id: string }) => {
  const { execute: executeDeleteSale, isPending } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluída com sucesso");
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      const flatennedError = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flatennedError.formErrors[0]);
    },
  });
  const handleDelete = () => {
    executeDeleteSale({ id });
  };
  return (
    <AlertDialogContent>
      <AlertDialogTitle>
        Tem certeza que deseja excluir esta venda?
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
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Excluir"}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialog;
