import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-4xl sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
      <div className={`mt-6 h-px w-24 bg-gold-gradient ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20">
        {eyebrow && <p className="eyebrow mb-3 animate-fade-up">{eyebrow}</p>}
        <h1 className="animate-fade-up text-4xl sm:text-6xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-2xl animate-fade-up text-ink-foreground/70">{sub}</p>}
        {children}
      </div>
      <div className="gold-divider" />
    </section>
  );
}
