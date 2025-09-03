"use client";

import { Prisma } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./TableDropdownMenu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const salesTableColumns: ColumnDef<
  Prisma.SalesGetPayload<{
    include: {
      SalesToProduct: {
        include: {
          product: true;
        };
      };
    };
  }>
>[] = [
  {
    accessorKey: "products",
    header: () => {
      return (
        <div className="p-4">
          <span>Produtos</span>
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
    accessorKey: "productsQuantity",
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
          <span>{row.getValue("productsQuantity")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return (
        <div className="p-4">
          <span>Preço</span>
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
            }).format(Number(row.getValue("price")))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
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
            }).format(new Date(row.getValue("date")))}
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
      return <SalesTableDropdownMenu sale={row.original} />;
    },
  },
];
