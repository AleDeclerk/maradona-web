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
    title: `${page.title} · Maradona`,
    description: `${page.tipo} · ${page.tags.join(", ")}`,
  };
}

function fmtDate(s: string): string {
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default async function WikiPage({ params }: PageProps) {
  const { category, slug } = await params;
  if (!CATEGORIES.includes(category as Category)) notFound();
  const cat = category as Category;
  const page = getPage(cat, slug);
  if (!page) notFound();

  // The title is rendered separately as the editorial headline.
  // Strip the leading `# Título` from content so it doesn't duplicate.
  const bodyMd = page.content.replace(/^\s*#\s+.+\n+/, "");
  const processed = resolveWikilinks(bodyMd);
  const backlinks = getBacklinks(slug);

  return (
    <article className="fade-up">
      {/* Header: kicker + headline */}
      <header className="mb-10 max-w-3xl mx-auto text-center">
        <p className="h-eyebrow mb-3 fade-up-d1">
          <Link
            href="/"
            className="hover:text-blood transition-colors"
          >
            Maradona
          </Link>{" "}
          ·{" "}
          <Link
            href={`/${cat}`}
            className="hover:text-blood transition-colors"
          >
            {categoryLabel(cat)}
          </Link>{" "}
          · {page.tipo}
        </p>
        <h1 className="h-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.95] fade-up-d2">
          {page.title}
        </h1>
        {page.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-5 fade-up-d3">
            {page.tags.map((t) => (
              <span key={t} className="stamp">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 mx-auto w-24 h-px bg-ink" />
      </header>

      {/* Body + sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_18rem] gap-10 lg:gap-14">
        <div className="prose-edit mx-auto md:mx-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                if (!href) return <span>{children}</span>;
                if (href.startsWith("?ghost=")) {
                  const target = decodeURIComponent(href.slice(7));
                  return (
                    <span
                      className="wikilink-ghost"
                      title={`Página pendiente: ${target}`}
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

        <aside className="text-sm">
          <div className="sticky top-4 space-y-8">
            {/* Ficha técnica */}
            <div>
              <h2 className="h-eyebrow mb-2 pb-1 rule-thin">Ficha</h2>
              <dl className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted space-y-1.5">
                <div className="flex justify-between gap-3">
                  <dt>Tipo</dt>
                  <dd className="text-ink">{page.tipo}</dd>
                </div>
                {page.fecha_creacion && (
                  <div className="flex justify-between gap-3">
                    <dt>Creada</dt>
                    <dd className="text-ink normal-case tracking-normal">
                      {fmtDate(page.fecha_creacion)}
                    </dd>
                  </div>
                )}
                {page.fecha_actualizacion && (
                  <div className="flex justify-between gap-3">
                    <dt>Última edición</dt>
                    <dd className="text-ink normal-case tracking-normal">
                      {fmtDate(page.fecha_actualizacion)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt>Sección</dt>
                  <dd className="text-ink">{categoryLabel(cat)}</dd>
                </div>
              </dl>
            </div>

            {/* Backlinks */}
            {backlinks.length > 0 && (
              <div>
                <h2 className="h-eyebrow mb-2 pb-1 rule-thin">
                  Citado en ({backlinks.length})
                </h2>
                <ul className="space-y-1.5">
                  {backlinks.map((b, i) => (
                    <li
                      key={`${b.category}/${b.slug}`}
                      className="text-sm leading-snug"
                    >
                      <span className="font-mono text-[0.65rem] text-ink-muted mr-1">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <Link
                        href={`/${b.category}/${b.slug}`}
                        className="link-grow text-ink hover:text-blood"
                      >
                        {b.title}
                      </Link>
                      <span className="block ml-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-muted">
                        {b.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fuentes raw */}
            {page.fuentes.length > 0 && (
              <div>
                <h2 className="h-eyebrow mb-2 pb-1 rule-thin">Fuentes</h2>
                <ul className="font-mono text-[0.7rem] text-ink-soft space-y-1 break-words">
                  {page.fuentes.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
