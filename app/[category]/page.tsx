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
    <div>
      <Link
        href="/"
        className="text-sm text-stone-500 hover:text-sky-700 hover:underline"
      >
        ← Inicio
      </Link>
      <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 mt-3 mb-1">
        {categoryLabel(cat)}
      </h1>
      <p className="text-stone-500 text-sm mb-6">
        {pages.length} {pages.length === 1 ? "página" : "páginas"}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pages.map((p) => (
          <li
            key={p.slug}
            className="border border-stone-300 rounded p-3 bg-white"
          >
            <Link
              href={`/${cat}/${p.slug}`}
              className="font-medium text-sky-700 hover:underline"
            >
              {p.title}
            </Link>
            {p.tags.length > 0 && (
              <p className="text-xs text-stone-500 mt-1">
                {p.tags.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
