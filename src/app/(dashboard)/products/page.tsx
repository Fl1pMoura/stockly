import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { Plus } from "lucide-react";
import DashboardSection from "../_components/Section";
import ProductForm from "./_components/Form";
import { productTableColumns } from "./_components/TableColumns";

const Products = () => {
  const products = [
    {
      name: "Produto 1",
      price: 100,
      stock: 10,
      status: "IN_STOCK",
    },
    {
      name: "Produto 2",
      price: 200,
      stock: 20,
      status: "IN_STOCK",
    },
    {
      name: "Produto 3",
      price: 300,
      stock: 30,
      status: "OUT_OF_STOCK",
    },
    {
      name: "Produto 4",
      price: 400,
      stock: 40,
      status: "OUT_OF_STOCK",
    },
    {
      name: "Produto 5",
      price: 500,
      stock: 50,
      status: "OUT_OF_STOCK",
    },
  ];
  return (
    <Dialog>
      <DashboardSection
        page="Produtos"
        pageTitle="Gestão de Produtos"
        button={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus size={24} />
                Novo produto
              </Button>
            </DialogTrigger>
            <ProductForm />
          </Dialog>
        }
      >
        <div className="rounded-[16px] bg-white p-2">
          <DataTable columns={productTableColumns} data={products} />
        </div>
      </DashboardSection>
      <ProductForm
        defaultValues={{
          name: "Produto 1",
          value: 100,
          stock: 10,
        }}
      />
    </Dialog>
  );
};

export default Products;
