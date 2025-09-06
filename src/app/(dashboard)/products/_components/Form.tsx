"use client";
import { upsertProduct } from "@/app/_actions/product/upsert-product";
import { upsertProductSchema } from "@/app/_actions/product/upsert-product/schema";
import Spinner from "@/app/_components/Spinner";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

interface IProductForm {
  defaultValues?: {
    id?: string;
    name: string;
    priceInCents: number;
    stock: number;
  };
  setIsOpen: (open: boolean) => void;
}

const ProductForm = ({ defaultValues, setIsOpen }: IProductForm) => {
  const isEdit = defaultValues;

  const form = useForm<z.infer<typeof upsertProductSchema>>({
    resolver: zodResolver(upsertProductSchema),
    values: defaultValues ?? {
      name: "",
      priceInCents: 0,
      stock: 1,
    },
  });

  const { execute: executeUpsertProduct, isPending } = useAction(
    upsertProduct,
    {
      onSuccess: () => {
        toast.success("Produto salvo com sucesso");
        form.reset();
        setIsOpen(false);
      },
      onError: ({ error: { validationErrors, serverError } }) => {
        const flatennedError = flattenValidationErrors(validationErrors);
        toast.error(serverError ?? flatennedError.formErrors[0]);
      },
    },
  );

  const onSubmit = (data: z.infer<typeof upsertProductSchema>) => {
    executeUpsertProduct(data);
  };

  return (
    <DialogContent className="max-w-[320px]">
      <DialogTitle>{isEdit ? "Editar Produto" : "Novo Produto"}</DialogTitle>
      <DialogDescription>
        {isEdit
          ? "Edite as informações do produto"
          : "Adicione um novo produto"}
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor unitário</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale={true}
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Estoque"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button className="w-1/2" variant={"secondary"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button className="w-1/2" type="submit" disabled={isPending}>
              {!isPending ? (
                isEdit ? (
                  "Atualizar Produto"
                ) : (
                  "Criar Produto"
                )
              ) : (
                <Spinner />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ProductForm;
