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
          <DataTable columns={productTableColumns} data={products} />
        </div>
      </DashboardSection>
    </Dialog>
  );
};

export default Products;
