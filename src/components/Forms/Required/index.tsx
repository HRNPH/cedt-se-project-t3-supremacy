interface RequiredProps {
  children: React.ReactNode;
  required?: boolean;
}

export const Required = (props: RequiredProps) => {
  const { children, required = true } = props;

  return (
    <>
      {children}
      {required && <span className="ml-0.5 text-base text-red-500">*</span>}
    </>
  );
};
