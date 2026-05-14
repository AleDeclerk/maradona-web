import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CATEGORIES, categoryLabel } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Maradona Wiki",
  description:
    "Wiki de Diego Armando Maradona — biografía, carrera, momentos, frases. Construida con WikiForge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body>
        <header className="border-b border-stone-300 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-baseline gap-4">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-tight text-stone-900 hover:text-sky-700"
            >
              Maradona Wiki
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={`/${c}`}
                  className="hover:text-sky-700 hover:underline"
                >
                  {categoryLabel(c)}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-stone-300 mt-12 py-6 text-center text-xs text-stone-500">
          Vault generado con{" "}
          <a
            href="https://github.com/anthropic/wikiforge"
            className="underline hover:text-sky-700"
          >
            WikiForge
          </a>{" "}
          · 65 páginas · 17 fuentes raw
        </footer>
      </body>
    </html>
  );
}
