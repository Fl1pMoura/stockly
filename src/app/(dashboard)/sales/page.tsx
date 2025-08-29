import { Plus } from "lucide-react";
import DashboardSection from "../_components/Section";

const Products = () => {
  return (
    <DashboardSection
      page="Vendas"
      pageTitle="Gestão de Vendas"
      buttonText="Adicionar Venda"
      icon={<Plus size={24} />}
    ></DashboardSection>
  );
};

export default Products;
