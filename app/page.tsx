import Link from "next/link";
import { CATEGORIES, categoryLabel, getPagesByCategory, getPage } from "@/lib/wiki";

const STATS = [
  { value: "491", label: "partidos en clubes" },
  { value: "259", label: "goles en clubes" },
  { value: "91", label: "con la albiceleste" },
  { value: "34", label: "goles en la selección" },
  { value: "1", label: "Copa del Mundo" },
];

const FEATURED: Array<{
  category: string;
  slug: string;
  kicker: string;
  pull?: string;
}> = [
  {
    category: "personas",
    slug: "diego-maradona",
    kicker: "El Diez",
    pull: "Villa Fiorito, 1960. Dique Luján, 2020.",
  },
  {
    category: "partidos",
    slug: "argentina-inglaterra-1986",
    kicker: "22 de junio de 1986",
    pull: "Dos goles en cuatro minutos. La mano y el cielo.",
  },
  {
    category: "frases",
    slug: "la-pelota-no-se-mancha",
    kicker: "10 de noviembre de 2001",
    pull: "Yo me equivoqué y pagué, pero la pelota no se mancha.",
  },
];

const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO MASTHEAD */}
      <section className="text-center mb-16">
        <p className="h-eyebrow mb-4">Crónica de un genio que tocó el cielo</p>
        <h2 className="h-display text-[clamp(2.5rem,7vw,5.5rem)] mb-3 fade-up-d1">
          Diego Armando<br />
          <span className="text-blood">Maradona</span>
        </h2>
        <p className="font-display italic text-xl sm:text-2xl text-ink-soft tracking-tight fade-up-d2">
          1960 — 2020
        </p>
        <div className="mt-6 fade-up-d3">
          <Link
            href="/personas/diego-maradona"
            className="inline-block border-2 border-ink bg-ink text-paper px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] hover:bg-blood hover:border-blood transition-colors"
          >
            Empezar por el principio →
          </Link>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="border-y-2 border-ink py-5 mb-16 fade-up-d3">
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-y-4">
          {STATS.map((s) => (
            <li key={s.label} className="text-center px-2">
              <p className="h-display text-3xl sm:text-4xl text-blood leading-none">
                {s.value}
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted mt-1">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* FRONT PAGE — featured editorial */}
      <section className="mb-20">
        <div className="rule-thick pb-1 mb-6 flex items-baseline justify-between">
          <h3 className="h-section text-xl">En portada</h3>
          <p className="h-eyebrow">Páginas centrales</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED.map((f, i) => {
            const page = getPage(f.category as never, f.slug);
            if (!page) return null;
            return (
              <article
                key={f.slug}
                className={`${i === 0 ? "md:border-r md:border-rule md:pr-8" : ""} ${
                  i === 1 ? "md:border-r md:border-rule md:pr-8" : ""
                }`}
              >
                <p className="h-eyebrow mb-2">{f.kicker}</p>
                <h4 className="h-display text-3xl leading-[1.02] mb-3">
                  <Link
                    href={`/${f.category}/${f.slug}`}
                    className="hover:text-blood transition-colors"
                  >
                    {page.title}
                  </Link>
                </h4>
                {f.pull && (
                  <p className="font-display italic text-lg text-ink-soft leading-snug">
                    “{f.pull}”
                  </p>
                )}
                <Link
                  href={`/${f.category}/${f.slug}`}
                  className="link-grow inline-block mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-blood"
                >
                  Leer la entrada →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES INDEX */}
      <section>
        <div className="rule-thick pb-1 mb-6 flex items-baseline justify-between">
          <h3 className="h-section text-xl">Índice general</h3>
          <p className="h-eyebrow">8 secciones · 65 páginas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {CATEGORIES.map((c, i) => {
            const pages = getPagesByCategory(c);
            return (
              <div key={c}>
                <div className="flex items-baseline gap-3 mb-2 pb-1 border-b border-ink">
                  <span className="h-display text-2xl text-blood">
                    {ROMAN[i + 1]}
                  </span>
                  <Link
                    href={`/${c}`}
                    className="h-section text-lg hover:text-blood transition-colors"
                  >
                    {categoryLabel(c)}
                  </Link>
                </div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted mb-2">
                  {pages.length} {pages.length === 1 ? "entrada" : "entradas"}
                </p>
                <ul className="text-sm space-y-1">
                  {pages.slice(0, 5).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${c}/${p.slug}`}
                        className="link-grow text-ink hover:text-blood"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                  {pages.length > 5 && (
                    <li>
                      <Link
                        href={`/${c}`}
                        className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted hover:text-blood"
                      >
                        + {pages.length - 5} más →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
