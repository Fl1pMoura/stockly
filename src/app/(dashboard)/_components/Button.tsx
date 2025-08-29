const Button = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: React.ComponentProps<"button">;
}) => {
  return (
    <button
      {...props}
      className="flex items-center gap-2 rounded-[8px] bg-green-100 text-sm font-medium text-white"
    >
      {children}
    </button>
  );
};

export default Button;
