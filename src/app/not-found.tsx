import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center" }}
      >
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "4rem", color: "var(--teal-100)", lineHeight: 1 }}>
          404
        </p>
        <h1 style={{ fontSize: "var(--text-h2)" }}>Page not found</h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "32rem" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <ButtonLink href="/" icon="arrow-left" iconPosition="start">
          Back to Home
        </ButtonLink>
      </div>
    </section>
  );
}
