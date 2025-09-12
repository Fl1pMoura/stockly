import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data/products/get-products";
import { Sales } from "@/generated/prisma";
import { Pick } from "@/generated/prisma/runtime/library";
import { ClipboardCopy, Ellipsis, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteDialog from "./DeleteDialog";
import SalesForm from "./Form";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sales, "id">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropdownMenu = ({
  sale,
  productOptions,
  products,
}: SalesTableDropdownMenuProps) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <div className="p-4">
      <span>
        <Sheet open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-details={sale.id}
                  variant={"ghost"}
                  className="text-green-500 hover:text-green-700"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await navigator.clipboard.writeText(sale.id);
                    toast.success("ID copiado para a área de transferência");
                  }}
                >
                  <ClipboardCopy size={16} /> Copiar ID
                </DropdownMenuItem>
                <SheetTrigger asChild>
                  <DropdownMenuItem>
                    <SquarePen size={16} /> Editar
                  </DropdownMenuItem>
                </SheetTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <Trash size={16} /> Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteDialog id={sale.id} />
          </AlertDialog>
          <SalesForm
            setIsOpen={setIsEditFormOpen}
            productOptions={productOptions}
            products={products}
          />
        </Sheet>
      </span>
    </div>
  );
};

export default SalesTableDropdownMenu;
