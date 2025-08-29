import { cn } from "@/app/_lib/utils";

interface IStatsCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const StatsCard = ({ icon, label, value, className }: IStatsCard) => {
  return (
    <div className={cn("rounded-xl bg-white p-6", className)}>
      <span className="mb-2 flex size-9 items-center justify-center rounded-[12px] bg-green-50 text-green-100">
        {icon}
      </span>
      <small className="text-sm font-medium text-slate-500">{label}</small>
      <h4 className="text-2xl font-semibold text-slate-900">{value}</h4>
    </div>
  );
};

export default StatsCard;
