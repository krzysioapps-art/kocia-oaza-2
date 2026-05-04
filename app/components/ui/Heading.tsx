// app/components/ui/Heading.tsx

type HeadingProps = {
  children: React.ReactNode;
  level?: "xl" | "lg" | "md";
};

export default function Heading({
  children,
  level = "lg",
}: HeadingProps) {
  return <h2 className={`heading heading--${level}`}>{children}</h2>;
}