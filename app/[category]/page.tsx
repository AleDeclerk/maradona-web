import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  Category,
  categoryLabel,
  getPagesByCategory,
} from "@/lib/wiki";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as Category)) notFound();
  const cat = category as Category;
  const pages = getPagesByCategory(cat);

  return (
    <div className="fade-up">
      <Link
        href="/"
        className="link-grow font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-blood"
      >
        ← Inicio
      </Link>

      <div className="mt-4 mb-10 text-center">
        <p className="h-eyebrow mb-2">Sección</p>
        <h1 className="h-display text-[clamp(2.5rem,7vw,5rem)] leading-none">
          {categoryLabel(cat)}
        </h1>
        <p className="font-display italic text-ink-soft mt-2 text-lg">
          {pages.length} {pages.length === 1 ? "entrada" : "entradas"}
        </p>
        <div className="mt-4 mx-auto w-20 h-px bg-ink" />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
        {pages.map((p, i) => (
          <li
            key={p.slug}
            className="border-t border-ink pt-3 fade-up"
            style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}
          >
            <p className="h-eyebrow mb-1">
              {String(i + 1).padStart(2, "0")} · {p.tipo}
            </p>
            <h2 className="h-display text-2xl leading-tight mb-2">
              <Link
                href={`/${cat}/${p.slug}`}
                className="hover:text-blood transition-colors"
              >
                {p.title}
              </Link>
            </h2>
            {p.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="stamp">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
