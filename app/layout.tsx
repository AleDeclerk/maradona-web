import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { CATEGORIES, categoryLabel } from "@/lib/wiki";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maradona — Enciclopedia Popular del Diez",
  description:
    "Wiki de Diego Armando Maradona. Biografía, carrera, momentos, frases. Construida con WikiForge.",
};

const SHORT_NAV: Array<[string, string]> = [
  ["clubes", "Clubes"],
  ["personas", "Personas"],
  ["partidos", "Partidos"],
  ["momentos", "Momentos"],
  ["epocas", "Épocas"],
  ["temas", "Temas"],
  ["frases", "Frases"],
  ["fuentes", "Fuentes"],
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <header className="border-b-4 border-ink">
          <div className="mx-auto max-w-6xl px-6 pt-6 pb-3">
            <div className="flex items-center justify-between text-[0.7rem] font-mono uppercase tracking-[0.18em] text-ink-muted mb-3">
              <span>Buenos Aires · Edición Permanente</span>
              <span className="hidden sm:inline">N.º D10S</span>
              <span>30 oct 1960 — 25 nov 2020</span>
            </div>
            <div className="rule-double">
              <h1 className="h-display text-center text-[clamp(3.5rem,12vw,8.5rem)] leading-none">
                <Link href="/" className="hover:text-blood transition-colors">
                  MARADONA
                </Link>
              </h1>
              <p className="text-center mt-1 font-display italic text-ink-soft text-base sm:text-lg tracking-wide">
                Enciclopedia popular del Diez
              </p>
            </div>
          </div>
          <nav className="border-t border-ink bg-paper-warm/60">
            <div className="mx-auto max-w-6xl px-6 py-2 flex flex-wrap justify-center gap-x-5 gap-y-1">
              {SHORT_NAV.map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="link-grow font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink hover:text-blood"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10 fade-up">{children}</main>

        <footer className="border-t-4 border-ink mt-16 bg-paper-warm/40">
          <div className="mx-auto max-w-6xl px-6 py-6 grid sm:grid-cols-3 gap-4 text-[0.7rem] font-mono uppercase tracking-[0.16em] text-ink-soft">
            <div>
              <p className="text-ink">Maradona Wiki</p>
              <p className="mt-1 normal-case tracking-normal text-ink-muted">
                Compilado por máquina, curado para humanos.
              </p>
            </div>
            <div className="sm:text-center">
              <p>65 páginas · 17 fuentes</p>
              <p className="mt-1 normal-case tracking-normal text-ink-muted">
                Vault generado con WikiForge.
              </p>
            </div>
            <div className="sm:text-right">
              <a
                href="https://github.com/AleDeclerk/maradona-web"
                className="link-grow text-ink hover:text-blood"
              >
                github / maradona-web
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
