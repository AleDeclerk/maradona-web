# Maradona Wiki

Wiki de Diego Armando Maradona — biografía, carrera, momentos, frases.

Construida con [WikiForge](https://github.com/anthropic/wikiforge): el LLM lee fuentes, extrae conocimiento, y lo organiza en páginas markdown interconectadas. El conocimiento se compila — no se re-deriva en cada consulta.

**Live:** https://maradona-web.vercel.app

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind v4
- `react-markdown` + `remark-gfm`
- 65 páginas wiki en castellano (es-AR) generadas estáticamente con `generateStaticParams`

## Estructura

```
maradona-web/
├── app/                  ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx          ← landing con grid de categorías
│   └── [category]/
│       ├── page.tsx      ← listado por categoría
│       └── [slug]/page.tsx  ← página individual + backlinks
├── lib/wiki.ts           ← lectura, frontmatter, wikilinks
└── content/wiki/         ← 65 páginas markdown
    ├── clubes/           ← Argentinos, Boca, Barcelona, Napoli, etc.
    ├── personas/         ← Diego, Pelé, Bilardo, Menotti, Cóppola, etc.
    ├── partidos/         ← Inglaterra 86, Italia 90, Final Sub-20 79
    ├── momentos/         ← Mano de Dios, Gol del Siglo, muerte 2020
    ├── epocas/           ← Fiorito, Cebollitas, Gloria 86, Napoli, declive
    ├── temas/            ← drogas, política, Malvinas, doping, Iglesia
    ├── frases/           ← las célebres con contexto
    └── fuentes/          ← una página por cada fuente raw ingestada
```

## Local dev

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Cómo agregar contenido

1. Ingestar nueva fuente (transcripción, artículo, dato) como markdown en `content/wiki/{categoría}/{slug}.md` con el frontmatter de 5 campos:

```yaml
---
tags: [categoria, subcategoria]
tipo: persona | club | partido | momento | epoca | tema | frase | fuente
fuentes: ["nombre-fuente-original"]
fecha_creacion: YYYY-MM-DD
fecha_actualizacion: YYYY-MM-DD
---
```

2. Densidad mínima: 8 wikilinks `[[slug]]` por página, distribuidos en el cuerpo.
3. Idioma estricto: castellano (es-AR).
4. Brevedad: 200-500 palabras por página.

## Roadmap

- [ ] Búsqueda client-side (fuse.js)
- [ ] Grafo visual estilo Obsidian
- [ ] Chat con RAG sobre el corpus (AI SDK + pgvector)
- [ ] Ingesta de La Noche del 10 (Whisper sobre los 13 episodios)
- [ ] Ingesta del documental Kapadia 2019

## Licencia

Contenido: derivado de Wikipedia (CC BY-SA) y prensa argentina pública. Código: MIT.
