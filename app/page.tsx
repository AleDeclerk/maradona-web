import Link from "next/link";
import { CATEGORIES, categoryLabel, getPagesByCategory } from "@/lib/wiki";
import { STICKERS } from "@/lib/stickers";
import { StickerCard } from "./sticker-card";

const STATS = [
  { value: "491", label: "partidos en clubes" },
  { value: "259", label: "goles en clubes" },
  { value: "91", label: "con la albiceleste" },
  { value: "34", label: "goles en la selección" },
  { value: "1", label: "Copa del Mundo" },
];

const ROMAN: Record<number, string> = {
  1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO COMPACTO */}
      <section className="text-center mb-10">
        <p className="h-eyebrow mb-3">1960 — 2020 · Enciclopedia popular del Diez</p>
        <h2 className="h-display text-[clamp(2rem,5.5vw,4rem)] mb-2 fade-up-d1">
          Diego Armando <span className="text-blood">Maradona</span>
        </h2>
      </section>

      {/* GALERÍA DE STICKERS — PROTAGONISTA */}
      <section className="mb-16 fade-up-d2">
        <div className="rule-thick pb-1 mb-6 flex items-baseline justify-between">
          <h3 className="h-section text-2xl">Stickers</h3>
          <p className="h-eyebrow">{STICKERS.length} piezas · foto + frase</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          {STICKERS.map((s, i) => (
            <StickerCard key={i} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="border-y-2 border-ink py-5 mb-16">
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

      {/* CATEGORIES INDEX — al fondo */}
      <section>
        <div className="rule-thick pb-1 mb-6 flex items-baseline justify-between">
          <h3 className="h-section text-xl">Índice general</h3>
          <p className="h-eyebrow">10 secciones</p>
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
                  {pages.slice(0, 4).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${c}/${p.slug}`}
                        className="link-grow text-ink hover:text-blood"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                  {pages.length > 4 && (
                    <li>
                      <Link
                        href={`/${c}`}
                        className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted hover:text-blood"
                      >
                        + {pages.length - 4} más →
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
