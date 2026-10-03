import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <div className="container">
        <section className="hero">
          <span className="eyebrow">404</span>
          <h1 className="display">Lorem ipsum not found</h1>
          <p className="lede">Dolor sit amet, consectetur adipiscing elit.</p>
          <div className="btn-row"><Button href="/" icon="arrow">Back to home</Button></div>
        </section>
      </div>
    </PageShell>
  );
}
