interface IDashboardSection {
  page: string;
  pageTitle: string;
  children?: React.ReactNode;
  button?: React.ReactNode;
}

const DashboardSection = ({
  page,
  pageTitle,
  button,
  children,
}: IDashboardSection) => {
  return (
    <section className="w-full flex-1 p-9 pb-4">
      <header className="mb-5 flex w-full justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-green-100">{page}</span>
          <h2 className="text-xl font-semibold text-slate-900">{pageTitle}</h2>
        </div>
        {button}
      </header>
      {children}
    </section>
  );
};

export default DashboardSection;
