type Variant = "primary" | "secondary" | "tertiary";
type Mode = "solid" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  mode?: Mode;
  onClick?: () => void;
  href?: string; // 🔥 dodajemy
};

export default function Button({
  children,
  variant = "primary",
  mode = "solid",
  onClick,
  href,
}: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    mode === "outline" ? `button--outline-${variant}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
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