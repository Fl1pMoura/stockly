"use client";

import { SalesDto } from "@/app/_data/sales/get-sales";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./TableDropdownMenu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const salesTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productNames",
    header: () => {
      return (
        <div className="p-4">
          <span>Produtos</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const allProducts = row.original.productNames.split(",");
      console.log(allProducts);
      return (
        <div className="p-4">
          <ul className="flex items-center text-sm font-medium text-slate-900">
            <li className="noscrollbar flex max-w-[180px] overflow-auto">
              {allProducts.map((product, index) => (
                <div className="flex items-center" key={index}>
                  <span>{product}</span>
                  {index < allProducts.length - 1 && (
                    <span className="mx-2 size-[5px] rounded-full bg-slate-500"></span>
                  )}
                </div>
              ))}
            </li>
          </ul>
        </div>
      );
    },
  },
  {
    accessorKey: "totalProducts",
    header: () => {
      return (
        <div className="p-4">
          <span>Quantidade de Produtos</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-4">
          <span>{row.original.totalProducts}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => {
      return (
        <div className="p-4">
          <span>Valor total</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-4">
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(row.original.totalAmount))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div className="p-4">
          <span>Data</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-4">
          <span>
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(row.getValue("createdAt"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => {
      return (
        <div className="p-4">
          <span>Ações</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <SalesTableDropdownMenu saleId={row.original.id} />;
    },
  },
];
