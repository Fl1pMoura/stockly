"use client";
import { upsertSales } from "@/app/_actions/sales/upsert-sale";
import Spinner from "@/app/_components/Spinner";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data/products/get-products";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ISalesFormProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
  setIsOpen?: (open: boolean) => void;
}

const formSchema = z.object({
  productId: z.uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce.number<number>().int().positive({
    message: "A quantidade é obrigatória.",
  }),
});

type formSchemaType = z.infer<typeof formSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  priceInCents: number;
  quantity: number;
}

const SalesForm = ({
  productOptions,
  setIsOpen,
  products,
}: ISalesFormProps) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      productId: "",
      quantity: 1,
    },
  });
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const onSubmit = (data: formSchemaType) => {
    const selectecProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectecProduct) {
      return;
    }

    const existingProduct = selectedProducts.find(
      (product) => product.id === selectecProduct.id,
    );

    const productOutOfStock =
      (existingProduct?.quantity ?? 0) + data.quantity > selectecProduct.stock;

    if (productOutOfStock) {
      setTimeout(() => {
        form.setError("quantity", {
          message: "Quantidade maior que o estoque disponível",
        });
      }, 0);
      return;
    }

    if (existingProduct) {
      form.reset();
      setSelectedProducts((currentProducts) => [
        ...currentProducts.filter(
          (product) => product.id !== selectecProduct.id,
        ),
        {
          id: selectecProduct.id,
          name: selectecProduct.name,
          priceInCents: selectecProduct.priceInCents,
          quantity: existingProduct.quantity + data.quantity,
        },
      ]);
      return;
    }

    form.reset();
    setSelectedProducts((currentProducts) => [
      ...currentProducts,
      {
        id: selectecProduct.id,
        name: selectecProduct.name,
        priceInCents: selectecProduct.priceInCents,
        quantity: data.quantity,
      },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const { execute: executeUpsertSales, isPending } = useAction(upsertSales, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flatennedError = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flatennedError.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso");
      setIsOpen?.(false);
      setSelectedProducts([]);
      form.reset();
    },
  });

  const handleSaleSubmit = async () => {
    await executeUpsertSales({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="gap-0 p-5">
      <SheetTitle className="mb-1 text-xl font-semibold text-slate-900">
        Adicionar venda
      </SheetTitle>
      <SheetDescription className="mb-6 text-sm text-slate-500">
        Insira as informações da venda
      </SheetDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione o produto"
                    value={field.value ?? ""}
                    options={productOptions.map((item) => ({
                      value: item.value,
                      label: item.label,
                    }))}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={1} step={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : "Adicionar produto"}
          </Button>
        </form>
        {selectedProducts.length > 0 && (
          <>
            <div className="mt-6">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                Produtos Adicionados
              </h2>
              <ul className="max-h-[400px] space-y-2 overflow-auto">
                {selectedProducts.map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-[8px] bg-slate-50 p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          productOptions.find(
                            (item) => item.value === selectedProducts[index].id,
                          )?.label
                        }
                      </p>
                      <p className="text-sm text-slate-500">
                        Quantidade: {selectedProducts[index].quantity}
                      </p>
                      <p className="text-sm text-slate-500">
                        Preço Unitário:{" "}
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(selectedProducts[index].priceInCents)}
                      </p>
                      <p className="text-sm text-slate-500">
                        Total:{" "}
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          selectedProducts[index].priceInCents *
                            selectedProducts[index].quantity,
                        )}
                      </p>
                    </div>
                    <Button
                      className="h-8 w-8"
                      type="button"
                      variant={"destructive"}
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <Trash />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="flex items-center justify-between rounded-[8px] bg-slate-100 p-4 text-base font-semibold text-slate-900">
                Total:{" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  selectedProducts.reduce((acc, item) => {
                    return acc + item.priceInCents * item.quantity;
                  }, 0),
                )}
              </h2>

              <Button
                className="mt-6 w-full"
                type="submit"
                onClick={handleSaleSubmit}
              >
                {isPending ? <Spinner /> : "Finalizar venda"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </SheetContent>
  );
};

export default SalesForm;
