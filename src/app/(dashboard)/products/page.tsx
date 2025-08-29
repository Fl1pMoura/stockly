import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { ClipboardCopy, Ellipsis, Plus, SquarePen, Trash } from "lucide-react";
import DashboardSection from "../_components/Section";

const Products = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <DashboardSection
      page="Produtos"
      pageTitle="Gestão de Produtos"
      buttonText="Novo Produto"
      icon={<Plus size={24} />}
    >
      <div className="rounded-[16px] bg-white p-2">
        <Table className="w-full table-fixed overflow-clip rounded-[8px]">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="b w-1/5 p-0">
                <span className="block truncate p-4">Produtos</span>
              </TableHead>
              <TableHead className="w-1/5 p-0">
                <span className="block truncate p-4">
                  Quantidade de Produtos
                </span>
              </TableHead>
              <TableHead className="w-1/5 p-0">
                <span className="block truncate p-4">Valor total</span>
              </TableHead>
              <TableHead className="w-1/5 p-0">
                <span className="block truncate p-4">Data</span>
              </TableHead>
              <TableHead className="w-1/5 p-0">
                <span className="block truncate p-4">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="w-1/5 p-0">
                  <span className="line-clamp-1 w-full p-4 text-ellipsis">
                    {invoice.invoice}
                  </span>
                </TableCell>
                <TableCell className="w-1/5 p-0">
                  <span className="line-clamp-1 w-full p-4 text-ellipsis">
                    {invoice.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="w-1/5 p-0">
                  <span className="line-clamp-1 w-full p-4 text-ellipsis">
                    {invoice.paymentMethod}
                  </span>
                </TableCell>
                <TableCell className="w-1/5 p-0">
                  <span className="line-clamp-1 w-full p-4 text-ellipsis">
                    {invoice.totalAmount}
                  </span>
                </TableCell>
                <TableCell className="w-1/5 p-0">
                  <div className="relative p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="text-green-100 hover:text-green-100"
                        >
                          <Ellipsis size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-fit" align="start">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <ClipboardCopy size={16} />
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <SquarePen size={16} />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Trash size={16} />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardSection>
  );
};

export default Products;
