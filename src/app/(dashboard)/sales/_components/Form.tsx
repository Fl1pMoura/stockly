"use client";
import { upsertSalesSchema } from "@/app/_actions/sales/upsert-sale/schema";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ISalesForm {
  productOption: ComboboxOption[];
  setIsOpen?: (open: boolean) => void;
}

const SalesForm = ({ productOption, setIsOpen }: ISalesForm) => {
  const form = useForm<z.infer<typeof upsertSalesSchema>>({
    resolver: zodResolver(upsertSalesSchema),
    values: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: z.infer<typeof upsertSalesSchema>) => {
    toast.success("Venda salva com sucesso");
    form.reset();
    setIsOpen?.(false);
  };

  const [selectedProducts, setSelectedProducts] = useState<
    z.infer<typeof upsertSalesSchema>[]
  >([]);

  const handleAddProduct = () => {
    const newProduct = form.getValues();
    let productExists = false;
    selectedProducts.map((item) => {
      if (item.productId === newProduct.productId) {
        item.quantity = Number(newProduct.quantity) + Number(item.quantity);
        productExists = true;
      }
    });
    if (!productExists) {
      setSelectedProducts([...selectedProducts, newProduct]);
    }
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
                    options={productOption.map((item) => ({
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
                  <Input {...field} type="number" min={1} max={100} step={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" onClick={handleAddProduct}>
            Adicionar produto
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default SalesForm;
