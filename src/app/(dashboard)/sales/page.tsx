import { DataTable } from "@/app/_components/ui/data-table";
import { getProducts } from "@/app/_data/products/get-products";
import { getSales } from "@/app/_data/sales/get-sales";
import DashboardSection from "../_components/Section";
import CreateSaleButton from "./_components/create-sale-button";
import { salesTableColumns } from "./_components/TableColumns";

const Sales = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));
  return (
    <DashboardSection
      page="Vendas"
      pageTitle="Gestão de Vendas"
      button={<CreateSaleButton />}
    >
      <div className="rounded-[16px] bg-white p-2">
        {sales.length > 0 && (
          <DataTable columns={salesTableColumns} data={tableData} />
        )}
      </div>
    </DashboardSection>
  );
};

export default Sales;
