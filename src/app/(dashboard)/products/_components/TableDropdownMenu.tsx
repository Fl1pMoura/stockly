import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopy, Ellipsis, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteProductDialog from "./DeleteDialog";
import ProductForm from "./Form";
import { Products } from "./TableColumns";

const ProductTableDropdownMenu = ({ product }: { product: Products }) => {
  console.log(product);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <div className="p-4">
      <span>
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-details={product.name}
                  variant={"ghost"}
                  className="text-green-500 hover:text-green-700"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await navigator.clipboard.writeText(product.id);
                    toast.success("ID copiado para a área de transferência");
                  }}
                >
                  <ClipboardCopy size={16} /> Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <SquarePen size={16} /> Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <Trash size={16} /> Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteProductDialog />
          </AlertDialog>
          <ProductForm
            setIsOpen={setIsEditFormOpen}
            defaultValues={{
              id: product.id,
              name: product.name,
              priceInCents: product.priceInCents,
              stock: product.stock,
            }}
          />
        </Dialog>
      </span>
    </div>
  );
};

export default ProductTableDropdownMenu;
