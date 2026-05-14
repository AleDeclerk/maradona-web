import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CATEGORIES,
  Category,
  categoryLabel,
  getAllPages,
  getBacklinks,
  getPage,
  resolveWikilinks,
} from "@/lib/wiki";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllPages().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const page = getPage(category as Category, slug);
  if (!page) return { title: "No encontrada" };
  return {
    title: `${page.title} · Maradona Wiki`,
    description: `${page.tipo} · ${page.tags.join(", ")}`,
  };
}

export default async function WikiPage({ params }: PageProps) {
  const { category, slug } = await params;
  if (!CATEGORIES.includes(category as Category)) notFound();
  const cat = category as Category;
  const page = getPage(cat, slug);
  if (!page) notFound();

  const processed = resolveWikilinks(page.content);
  const backlinks = getBacklinks(slug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8">
      <article>
        <div className="text-sm text-stone-500 mb-4">
          <Link href="/" className="hover:text-sky-700 hover:underline">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href={`/${cat}`}
            className="hover:text-sky-700 hover:underline"
          >
            {categoryLabel(cat)}
          </Link>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {page.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="prose-wiki">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                if (!href) return <span>{children}</span>;
                if (href.startsWith("?ghost=")) {
                  const slug = decodeURIComponent(href.slice(7));
                  return (
                    <span
                      className="wikilink-ghost"
                      title={`Página pendiente: ${slug}`}
                    >
                      {children}
                    </span>
                  );
                }
                if (href.startsWith("/")) {
                  return <Link href={href}>{children}</Link>;
                }
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          >
            {processed}
          </ReactMarkdown>
        </div>

        <div className="mt-12 text-xs text-stone-500 border-t border-stone-200 pt-3">
          tipo: {page.tipo} · creada: {page.fecha_creacion} · actualizada:{" "}
          {page.fecha_actualizacion}
        </div>
      </article>

      <aside className="text-sm">
        <div className="sticky top-4 space-y-6">
          {backlinks.length > 0 && (
            <div>
              <h2 className="font-serif font-bold text-stone-900 mb-2 text-base">
                Aparece en
              </h2>
              <ul className="space-y-1">
                {backlinks.map((b) => (
                  <li key={`${b.category}/${b.slug}`}>
                    <Link
                      href={`/${b.category}/${b.slug}`}
                      className="text-sky-700 hover:underline"
                    >
                      {b.title}
                    </Link>{" "}
                    <span className="text-xs text-stone-500">
                      · {b.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page.fuentes.length > 0 && (
            <div>
              <h2 className="font-serif font-bold text-stone-900 mb-2 text-base">
                Fuentes raw
              </h2>
              <ul className="text-xs text-stone-600 space-y-1">
                {page.fuentes.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
