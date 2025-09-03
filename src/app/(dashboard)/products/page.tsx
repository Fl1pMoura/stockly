import NoData from "@/app/_components/icons/no-data";
import { DataTable } from "@/app/_components/ui/data-table";
import { Dialog } from "@/app/_components/ui/dialog";
import { getProducts } from "@/app/_data/products/get-products";
import DashboardSection from "../_components/Section";
import { productTableColumns } from "./_components/TableColumns";
import CreateProductButton from "./_components/create-product-button";

const Products = async () => {
  const products = await getProducts();
  return (
    <Dialog>
      <DashboardSection
        page="Produtos"
        pageTitle="Gestão de Produtos"
        button={<CreateProductButton />}
      >
        <div className="rounded-[16px] bg-white p-2">
          {products.length > 0 && (
            <DataTable columns={productTableColumns} data={products} />
          )}
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-2xl font-bold text-slate-900">
              Nenhum produto encontrado.
              <span className="mt-10 flex size-72 text-green-100">
                <NoData />
              </span>
            </div>
          )}
        </div>
      </DashboardSection>
    </Dialog>
  );
};

export default Products;
