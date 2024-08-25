type FormProps = {
  className?: string;
  label?: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: boolean;
};

export default function FormControl({
  className,
  label,
  htmlFor,
  children,
  error,
}: FormProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-[24px] font-bold" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
