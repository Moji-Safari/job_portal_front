interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition duration-200";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-danger text-white hover:bg-red-600",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};
