"use client";

import { cn } from "@/app/_lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./TableDropdownMenu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  name: string;
  priceInCents: number;
  stock: number;
  status: string;
};

export const productTableColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="p-4">
          <span>Produto</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-4">
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priceInCents",
    header: () => {
      return (
        <div className="p-4">
          <span>Valor unitário</span>
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
            }).format(row.getValue("priceInCents"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => {
      return (
        <div className="p-4">
          <span>Estoque</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-4">
          <span>{row.getValue("stock")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="p-4">
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusLabel = status === "IN_STOCK" ? "Em estoque" : "Esgotado";
      return (
        <div
          className={cn(
            "flex w-fit items-center gap-2 rounded-[12px] px-2",
            status === "IN_STOCK" ? "bg-green-50" : "bg-slate-50",
          )}
        >
          <span
            className={cn(
              "block size-2 rounded-full",
              status === "IN_STOCK" ? "bg-green-100" : "bg-slate-500",
            )}
          />
          <span
            className={cn(
              "text-xs font-semibold",
              status === "IN_STOCK" ? "text-green-100" : "text-slate-500",
            )}
          >
            {statusLabel}
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
      return <ProductTableDropdownMenu product={row.original} />;
    },
  },
];
