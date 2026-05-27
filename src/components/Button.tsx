// This is a REUSABLE button component
// Think of it like a stamp - you can stamp it anywhere with different colors/text

interface ButtonProps {
  children: React.ReactNode; // What text goes inside the button
  variant?: "primary" | "secondary" | "danger"; // What color/style
  onClick?: () => void; // What happens when clicked (optional)
  disabled?: boolean; // Is the button grayed out?
  className?: string; // Extra CSS classes if needed
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  // Choose different styles based on variant
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
