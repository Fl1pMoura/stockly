import { DataTable } from "@/app/_components/ui/data-table";
import { getSales } from "@/app/_data/sales/get-sales";
import DashboardSection from "../_components/Section";
import CreateSaleButton from "./_components/create-sale-button";
import { salesTableColumns } from "./_components/TableColumns";

const Sales = async () => {
  const sales = await getSales();
  return (
    <DashboardSection
      page="Vendas"
      pageTitle="Gestão de Vendas"
      button={<CreateSaleButton />}
    >
      <div className="rounded-[16px] bg-white p-2">
        {sales.length > 0 && (
          <DataTable columns={salesTableColumns} data={sales} />
        )}
      </div>
    </DashboardSection>
  );
};

export default Sales;
