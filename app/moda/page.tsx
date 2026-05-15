import Link from "next/link";
import { getPagesByCategory } from "@/lib/wiki";

export const metadata = {
  title: "Moda y look · Maradona",
  description:
    "Galería visual de Diego Maradona — fotos libres de Wikimedia Commons en cinco décadas. Hover para ver el año y entrar a la ficha.",
};

export default function ModaGalleryPage() {
  const pages = getPagesByCategory("moda").filter((p) => p.image);

  // Group by year for the timeline navigation
  const byYear = new Map<string, number>();
  for (const p of pages) {
    const y = p.year ?? "—";
    byYear.set(y, (byYear.get(y) ?? 0) + 1);
  }
  const years = Array.from(byYear.entries()).sort((a, b) => {
    const aNum = parseInt(a[0]) || 9999;
    const bNum = parseInt(b[0]) || 9999;
    return aNum - bNum;
  });

  return (
    <div className="fade-up">
      {/* Header */}
      <Link
        href="/"
        className="link-grow font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-blood"
      >
        ← Inicio
      </Link>

      <div className="mt-4 mb-8 text-center">
        <p className="h-eyebrow mb-2">Galería</p>
        <h1 className="h-display text-[clamp(2.5rem,7vw,5rem)] leading-none">
          Moda y look
        </h1>
        <p className="font-display italic text-ink-soft mt-2 text-lg">
          {pages.length} fotografías · Cinco décadas
        </p>
        <div className="mt-4 mx-auto w-20 h-px bg-ink" />
      </div>

      {/* Year nav */}
      <nav className="mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]">
        {years.map(([y, count]) => (
          <a
            key={y}
            href={`#y-${y}`}
            className="link-grow text-ink hover:text-blood"
          >
            {y} <span className="text-ink-muted">·{count}</span>
          </a>
        ))}
      </nav>

      {/* Gallery sections per year */}
      {years.map(([y]) => {
        const items = pages.filter((p) => (p.year ?? "—") === y);
        return (
          <section key={y} id={`y-${y}`} className="mb-12">
            <div className="rule-thick pb-1 mb-4 flex items-baseline justify-between">
              <h2 className="h-section text-2xl">{y}</h2>
              <p className="h-eyebrow">{items.length} {items.length === 1 ? "foto" : "fotos"}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/moda/${p.slug}`}
                  className="group relative block aspect-square overflow-hidden bg-paper-warm border border-rule shadow-[3px_3px_0_var(--color-sepia)] hover:shadow-[5px_5px_0_var(--color-blood)] transition-shadow"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image!}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover [filter:sepia(0.15)_saturate(0.85)] group-hover:[filter:none] transition-[filter] duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-paper leading-tight">
                      {p.tags
                        .filter((t) => t !== "moda")
                        .slice(0, 3)
                        .join(" · ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p className="mt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
        Imágenes vía Wikimedia Commons · Licencia libre
      </p>
    </div>
  );
}
