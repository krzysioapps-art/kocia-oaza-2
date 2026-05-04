import "@/app/style/ui/card.css";

type CardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function Card({ children, href, className = "" }: CardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper href={href} className={`card ${className}`}>
      {children}
    </Wrapper>
  );
}