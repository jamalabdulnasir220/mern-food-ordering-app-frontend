interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

const Logo = ({
  className = "",
  showText = true,
  size = "md",
  variant = "default",
}: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl md:text-4xl",
  };

  const isWhite = variant === "white";
  const iconColor = isWhite ? "white" : "currentColor";
  const textColor = isWhite ? "text-footer-foreground" : "text-brand";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={`${sizeClasses[size]} ${isWhite ? "text-footer-foreground" : "text-brand"}`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="24"
          cy="30"
          r="12"
          fill={isWhite ? "white" : "currentColor"}
          className={isWhite ? "" : "text-brand"}
          stroke={isWhite ? "currentColor" : "white"}
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="30"
          r="8"
          fill={isWhite ? "currentColor" : "white"}
          className={isWhite ? "text-brand" : ""}
        />
        <path
          d="M18 6 L18 20 M16 20 L16 24 L18 24 L18 20 M20 20 L20 24 L18 24 L18 20"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 24 L20 24"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="30" cy="14" rx="2.5" ry="6" fill={iconColor} />
        <path
          d="M30 20 L30 24"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span
          className={`font-bold tracking-tight ${textColor} ${textSizeClasses[size]}`}
        >
          GhanaBite
        </span>
      )}
    </div>
  );
};

export default Logo;
