import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CONTENT_DIR = path.join(process.cwd(), "content", "wiki");

export const CATEGORIES = [
  "clubes",
  "epocas",
  "frases",
  "fuentes",
  "moda",
  "momentos",
  "partidos",
  "personas",
  "stickers",
  "temas",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface PageMeta {
  category: Category;
  slug: string;
  title: string;
  tags: string[];
  tipo: string;
  fuentes: string[];
  fecha_creacion: string;
  fecha_actualizacion: string;
  image?: string;
  year?: string;
}

export interface Page extends PageMeta {
  content: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  clubes: "Clubes y estadios",
  epocas: "Épocas",
  frases: "Frases",
  fuentes: "Fuentes",
  moda: "Moda y look",
  momentos: "Momentos",
  partidos: "Partidos",
  personas: "Personas",
  stickers: "Stickers",
  temas: "Temas",
};

export function categoryLabel(c: Category): string {
  return CATEGORY_LABELS[c];
}

let indexCache: Page[] | null = null;

function deriveTitle(raw: string, content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : raw;
}

export function getAllPages(): Page[] {
  if (indexCache) return indexCache;
  const pages: Page[] = [];
  for (const cat of CATEGORIES) {
    const dir = path.join(CONTENT_DIR, cat);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      const filepath = path.join(dir, file);
      const raw = fs.readFileSync(filepath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Record<string, unknown>;
      const toDateStr = (v: unknown): string => {
        if (v instanceof Date) return v.toISOString().slice(0, 10);
        if (typeof v === "string") return v;
        return "";
      };
      pages.push({
        category: cat,
        slug,
        title: deriveTitle(slug, parsed.content),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        tipo: typeof data.tipo === "string" ? data.tipo : "",
        fuentes: Array.isArray(data.fuentes) ? (data.fuentes as string[]) : [],
        fecha_creacion: toDateStr(data.fecha_creacion),
        fecha_actualizacion: toDateStr(data.fecha_actualizacion),
        image: typeof data.image === "string" ? data.image : undefined,
        year: typeof data.year === "string" ? data.year : undefined,
        content: parsed.content,
      });
    }
  }
  indexCache = pages;
  return pages;
}

export function getPagesByCategory(c: Category): Page[] {
  return getAllPages()
    .filter((p) => p.category === c)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getPage(c: Category, slug: string): Page | null {
  return getAllPages().find((p) => p.category === c && p.slug === slug) ?? null;
}

function buildSlugIndex(): Map<
  string,
  { category: Category; slug: string; title: string }
> {
  const map = new Map<
    string,
    { category: Category; slug: string; title: string }
  >();
  for (const p of getAllPages()) {
    map.set(p.slug, { category: p.category, slug: p.slug, title: p.title });
  }
  return map;
}

/**
 * Convierte [[slug]] y [[slug|texto]] de Obsidian a markdown [texto](/category/slug).
 * Cuando no hay label, usa el título de la página (no el slug crudo).
 * Cuando el slug no existe, deja una marca ?ghost=1 para estilarlo distinto.
 */
export function resolveWikilinks(content: string): string {
  const slugIndex = buildSlugIndex();
  return content.replace(
    /\[\[([^\]\\|]+)(?:\\?\|([^\]]+))?\]\]/g,
    (_full, target: string, label: string | undefined) => {
      const slug = target.trim();
      const hit = slugIndex.get(slug);
      if (hit) {
        const text = (label ?? hit.title).trim();
        return `[${text}](/${hit.category}/${hit.slug})`;
      }
      const text = (label ?? slug).trim();
      return `[${text}](?ghost=${encodeURIComponent(slug)})`;
    },
  );
}

export interface BacklinkGroup {
  category: Category;
  slug: string;
  title: string;
}

export function getBacklinks(slug: string): BacklinkGroup[] {
  const result: BacklinkGroup[] = [];
  const re = new RegExp(`\\[\\[${slug}(?:\\\\?\\|[^\\]]+)?\\]\\]`);
  for (const p of getAllPages()) {
    if (p.slug === slug) continue;
    if (re.test(p.content)) {
      result.push({ category: p.category, slug: p.slug, title: p.title });
    }
  }
  return result.sort((a, b) => a.title.localeCompare(b.title));
}
