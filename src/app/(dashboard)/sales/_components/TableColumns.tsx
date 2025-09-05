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
    accessorKey: "SalesToProduct",
    header: () => {
      return (
        <div className="p-4">
          <span>Produtos</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const allProducts = row
        .getValue<
          Prisma.SalesToProductGetPayload<{
            include: {
              product: true;
            };
          }>[]
        >("SalesToProduct")
        .map((item) => item.product.name);
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
    accessorKey: "quantity",
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
          <span>
            {row
              .getValue<
                Prisma.SalesToProductGetPayload<{
                  include: {
                    product: true;
                  };
                }>[]
              >("SalesToProduct")
              .reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPriceInCents",
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
            }).format(
              Number(
                row
                  .getValue<
                    Prisma.SalesToProductGetPayload<{
                      include: {
                        product: true;
                      };
                    }>[]
                  >("SalesToProduct")
                  .reduce(
                    (acc, item) =>
                      acc + (item.product.priceInCents / 100) * item.quantity,
                    0,
                  ),
              ),
            )}
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
            }).format(row.getValue("date"))}
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
