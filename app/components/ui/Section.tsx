import Container from "./Container";

type Props = {
    children: React.ReactNode;
    variant?: "default" | "alt" | "yell";
};

export default function Section({ children, variant = "default" }: Props) {
    const variantClass =
        variant === "alt"
            ? "section--alt"
            : variant === "yell"
                ? "section--yell"
                : "";

    return (
        <section className={`section ${variantClass}`}>
            <Container>{children}</Container>
        </section>
    );
}

/* SUBCOMPONENTS */

Section.Header = function ({ children }: { children: React.ReactNode }) {
    return <div className="section__header">{children}</div>;
};

Section.Content = function ({ children }: { children: React.ReactNode }) {
    return <div className="section__content">{children}</div>;
};

Section.Footer = function ({ children }: { children: React.ReactNode }) {
    return <div className="section__footer">{children}</div>;
};