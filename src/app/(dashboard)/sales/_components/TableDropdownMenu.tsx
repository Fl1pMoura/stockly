import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ClipboardCopy, Ellipsis, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SalesTableDropdownMenu = ({ saleId }: { saleId: string }) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <div className="p-4">
      <span>
        <Sheet open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-details={saleId}
                  variant={"ghost"}
                  className="text-green-500 hover:text-green-700"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await navigator.clipboard.writeText(saleId);
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
          </AlertDialog>
          {/* <SalesForm setIsOpen={setIsEditFormOpen} productOption={sale.SalesToProduct} /> */}
        </Sheet>
      </span>
    </div>
  );
};

export default SalesTableDropdownMenu;
