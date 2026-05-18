type Variant = "primary" | "secondary" | "tertiary";
type Mode = "solid" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  mode?: Mode;

  type?: "button" | "submit" | "reset";

  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  mode = "solid",

  type = "button",

  disabled = false,
  onClick,
  href,
  target,
  rel,
  className,
}: ButtonProps) {
  const classes = [
    "button",
    mode === "outline"
      ? `button--outline-${variant}`
      : `button--${variant}`,
    disabled && "button--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 🔗 LINK
  if (href) {
    return (
      <a
        href={disabled ? undefined : href} // 🔥 blokada
        target={target}
        rel={rel}
        className={classes}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // 🔘 BUTTON
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}