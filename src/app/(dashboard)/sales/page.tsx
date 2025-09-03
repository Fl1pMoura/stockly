import { getSales } from "@/app/_data/sales/get-sales";
import DashboardSection from "../_components/Section";
import CreateSaleButton from "./_components/create-sale-button";

const Products = async () => {
  const sales = await getSales();
  return (
    <DashboardSection
      page="Vendas"
      pageTitle="Gestão de Vendas"
      button={<CreateSaleButton />}
    >
      {/* {sales.length > 0 && (
        <DataTable columns={salesTableColumns} data={sales} />
      )} */}
    </DashboardSection>
  );
};

export default Products;
