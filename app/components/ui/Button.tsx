type Variant = "primary" | "secondary" | "tertiary";
type Mode = "solid" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  mode?: Mode;
  onClick?: () => void;
  href?: string;
  target?: string; // ✅
  rel?: string;    // ✅
};

export default function Button({
  children,
  variant = "primary",
  mode = "solid",
  onClick,
  href,
  target,   // ✅ dodaj
  rel,      // ✅ dodaj
}: ButtonProps) {
  const classes = [
    "button",
    mode === "outline"
      ? `button--outline-${variant}`
      : `button--${variant}`,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}