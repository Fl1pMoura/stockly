import { DollarSign } from "lucide-react";
import DashboardSection from "./_components/Section";
import StatsCard from "./_components/StatsCard";

const Dashboard = () => {
  return (
    <DashboardSection page="Home" pageTitle="Dashboard">
      <div className="mb-4 flex w-full items-center gap-6">
        <StatsCard
          className="w-1/2"
          icon={<DollarSign size={24} />}
          label="Receita total"
          value={Number(45231.89).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <StatsCard
          className="w-1/2"
          icon={<DollarSign size={24} />}
          label="Receita total"
          value={Number(45231.89).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
      </div>
      <div className="mb-4 flex w-full items-center gap-6">
        <StatsCard
          className="w-1/3"
          icon={<DollarSign size={24} />}
          label="Receita total"
          value={Number(45231.89).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <StatsCard
          className="w-1/3"
          icon={<DollarSign size={24} />}
          label="Receita total"
          value={Number(45231.89).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <StatsCard
          className="w-1/3"
          icon={<DollarSign size={24} />}
          label="Receita total"
          value={Number(45231.89).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
      </div>
    </DashboardSection>
  );
};

export default Dashboard;
