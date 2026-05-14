import Link from "next/link";
import { CATEGORIES, categoryLabel, getPagesByCategory } from "@/lib/wiki";

export default function HomePage() {
  return (
    <div>
      <section className="mb-10">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900 mb-3">
          Diego Armando Maradona
        </h1>
        <p className="text-stone-600 text-lg max-w-2xl">
          Wiki de conocimiento sobre Diego Maradona: biografía, carrera, momentos, frases.
          Construida con{" "}
          <a
            href="https://github.com/anthropic/wikiforge"
            className="underline text-sky-700"
          >
            WikiForge
          </a>
          .
        </p>
        <p className="mt-3">
          <Link
            href="/personas/diego-maradona"
            className="inline-block bg-sky-700 text-white px-4 py-2 rounded text-sm hover:bg-sky-800"
          >
            Empezar por la página de Diego →
          </Link>
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => {
          const pages = getPagesByCategory(c);
          return (
            <div
              key={c}
              className="border border-stone-300 rounded-lg p-4 bg-white"
            >
              <Link
                href={`/${c}`}
                className="font-serif text-lg font-bold text-stone-900 hover:text-sky-700"
              >
                {categoryLabel(c)}
              </Link>
              <p className="text-xs text-stone-500 mt-1">
                {pages.length} {pages.length === 1 ? "página" : "páginas"}
              </p>
              <ul className="mt-3 text-sm space-y-1">
                {pages.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${c}/${p.slug}`}
                      className="text-sky-700 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
                {pages.length > 6 && (
                  <li className="text-stone-500 text-xs">
                    + {pages.length - 6} más…
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}
