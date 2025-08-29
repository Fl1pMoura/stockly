"use client";
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
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

interface IProductForm {
  defaultValues?: {
    name: string;
    value: number;
    stock: number;
  };
}

const ProductForm = ({ defaultValues }: IProductForm) => {
  const isEdit = defaultValues;
  const productFormSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Nome é obrigatório",
      })
      .trim(),
    value: z
      .number()
      .positive({
        message: "Valor é obrigatório",
      })
      .min(0, {
        message: "Valor deve ser maior que 0",
      })
      .or(z.string()),
    stock: z
      .number()
      .positive({
        message: "Estoque é obrigatório",
      })
      .min(1, {
        message: "Estoque deve ser maior que 0",
      }),
  });

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      value: 0,
      stock: 1,
    },
  });

  const onSubmit = (data: z.infer<typeof productFormSchema>) => {
    console.log(data);
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
            name="value"
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
            <Button className="w-1/2" type="submit">
              {isEdit ? "Atualizar Produto" : "Criar Produto"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ProductForm;
