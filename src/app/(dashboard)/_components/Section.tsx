import Button from "./Button";

interface IDashboardSection {
  page: string;
  pageTitle: string;
  buttonText?: string;
  icon?: React.ReactNode;
}

const DashboardSection = ({
  page,
  pageTitle,
  buttonText,
  icon,
}: IDashboardSection) => {
  return (
    <section className="p-9 pb-4">
      <header className="flex justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-green-100">{page}</span>
          <h2 className="text-xl font-semibold text-slate-900">{pageTitle}</h2>
        </div>
        {buttonText && (
          <Button>
            {icon}
            {buttonText}
          </Button>
        )}
      </header>
    </section>
  );
};

export default DashboardSection;
