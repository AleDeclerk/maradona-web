import Link from "next/link";
import { getPagesByCategory } from "@/lib/wiki";
import { STICKERS } from "@/lib/stickers";
import { StickerCard } from "../sticker-card";

export const metadata = {
  title: "Stickers · Maradona",
  description: "Galería de stickers visuales de Diego — foto y frase.",
};

export default function StickersGalleryPage() {
  const wikiPages = getPagesByCategory("stickers");

  return (
    <div className="fade-up">
      <Link
        href="/"
        className="link-grow font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-blood"
      >
        ← Inicio
      </Link>

      <div className="mt-4 mb-8 text-center">
        <p className="h-eyebrow mb-2">Galería</p>
        <h1 className="h-display text-[clamp(2.5rem,7vw,5rem)] leading-none">
          Stickers
        </h1>
        <p className="font-display italic text-ink-soft mt-2 text-lg">
          {STICKERS.length} piezas
        </p>
        <div className="mt-4 mx-auto w-20 h-px bg-ink" />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 mb-8">
        {STICKERS.map((s, i) => (
          <StickerCard key={i} s={s} i={i} />
        ))}
      </section>

      {wikiPages.length > 0 && (
        <section className="mt-12 pt-6 border-t-2 border-ink">
          <h2 className="h-section text-xl mb-3">Fichas detalladas</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {wikiPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/stickers/${p.slug}`} className="link-grow text-ink hover:text-blood">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
