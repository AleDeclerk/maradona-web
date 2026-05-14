# Log

Historial cronológico de operaciones del vault.

---

## [2026-05-14] setup | Vault inicial

- Estructura creada: `raw/{libros,transcripciones,articulos,datos}` y `wiki/{fuentes,personas,clubes,partidos,momentos,epocas,temas,frases}`.
- `CLAUDE.md` adaptado al dominio Diego Maradona (idioma es-AR, frontmatter 5 campos, mínimo 8 wikilinks).

## [2026-05-14] ingest | Sembrado inicial — 7 fuentes

- **Páginas wiki creadas: 47** (más index, log, CLAUDE.md):
  - fuentes/: 7
  - clubes/: 10 (Argentinos, Boca, Barcelona, Napoli, Sevilla, NOB, Selección + La Bombonera, Azteca, San Paolo)
  - partidos/: 3 (Inglaterra 86, Final 86, Despedida Bombonera)
  - momentos/: 5 (Mano de Dios, Gol del Siglo, Baile cordones, Caño a Cabrera, La Noche del 10)
  - frases/: 4 (Pelota no se mancha, Me cortaron las piernas, Cielo con las manos, Mano de Dios frase)
  - epocas/: 5 (Cebollitas, Gloria 86, Etapa Napoli, Declive, Post-jugador)
  - personas/: 8 (Diego, Pelé, Bilardo, Menotti, Cóppola, Czysterpiller, Villafañe, Víctor Hugo)
  - temas/: 5 (Drogas, Política, Malvinas, Doping, Iglesia Maradoniana)
- **Fuentes raw ingestadas:** 7 archivos (5 artículos + 2 transcripciones).

## [2026-05-14] lint | Checklist obligatoria — vault sembrado

- ✓ **Frontmatter:** 47/47 páginas con los 5 campos exactos (`tags`, `tipo`, `fuentes`, `fecha_creacion`, `fecha_actualizacion`).
- ✓ **Idioma:** 100% en castellano (es-AR).
- ✓ **Fantasmas:** 0 wikilinks rotos. (17 iniciales → corregidos: 5 mediante creación de páginas nuevas; resto mediante sed para renombrar o degradar a texto plano).
- ✓ **Densidad de wikilinks:** todas las páginas con ≥8 wikilinks.
- ✓ **Huérfanas:** 0 (toda página tiene al menos 1 entrante).
- ✓ **Raw vinculados:** los 7 archivos raw aparecen como wikilink desde sus respectivas páginas fuentes/.
- **Top 10 páginas más enlazadas:**
  1. `seleccion-argentina-jugador` (42 entrantes)
  2. `diego-maradona` (38) — hub central
  3. `gloria-mexico-86` (38)
  4. `wikipedia-es` (37)
  5. `ssc-napoli` (35)
  6. `mano-de-dios` (32)
  7. `gol-del-siglo` (28)
  8. `boca-juniors` (28)
  9. `drogas-y-adicciones` (27)
  10. `argentina-inglaterra-1986` (27)
- **Gaps identificados para próxima ingesta:** falta corpus de La Noche del 10 (transcripciones de los 13 episodios), documental Kapadia 2019, libros completos de Arcucci/Burns, hemeroteca extensa, estadísticas estructuradas (FBref/Transfermarkt) por partido.

## [2026-05-14] ingest #2 | Expansión del corpus — 10 fuentes nuevas

Segunda ingesta. Tematizada por gap del primer batch.

- **Archivos raw nuevos (10):** Italia-Argentina semifinal 1990, Mundial Sub-20 1979, muerte 25-11-2020, Cuba/La Pradera 2000-2004, Gimnasia LP 2019-2020, Dorados de Sinaloa 2018-2019, documental Kapadia 2019, infancia Villa Fiorito, La Noche del 10 (programa), estadísticas completas tabulares.
- **Páginas wiki nuevas (19):**
  - fuentes/: `documental-kapadia`, `la-noche-del-10-fuente`, `estadisticas-completas` (3)
  - partidos/: `italia-argentina-1990-semifinal`, `final-mundial-sub-20-1979`, `final-mundial-italia-1990` (3)
  - momentos/: `muerte-2020`, `la-noche-del-10` (programa) (2)
  - temas/: `cuba-y-rehabilitacion` (1)
  - clubes/: `gimnasia-la-plata`, `dorados-sinaloa` (2)
  - epocas/: `infancia-villa-fiorito` (1)
  - personas/: `diego-sinagra`, `hugo-maradona`, `sergio-goycochea`, `claudio-caniggia`, `francisco-cornejo`, `ramon-diaz`, `asif-kapadia` (7)
- **Actualizaciones en páginas existentes:** post-jugador, seleccion-argentina-jugador, etapa-napoli, drogas-y-adicciones, politica, cebollitas, argentinos-juniors, claudia-villafane, wikipedia-en (con nuevos wikilinks a las nuevas páginas).

## [2026-05-14] lint #2 | post-ingesta de expansión

- **Páginas wiki totales:** 65 (más index, log, CLAUDE.md).
- **Archivos raw totales:** 17 (7 originales + 10 nuevos).
- ✓ Frontmatter completo en las 65 páginas.
- ✓ 0 fantasmas.
- ✓ Densidad ≥ 8 wikilinks por página.
- ✓ Todas las páginas con al menos 1 entrante.
- **Próximos gaps:** transcripciones Whisper de La Noche del 10, transcripciones del documental Kapadia, Yo soy el Diego completo (vía préstamo Internet Archive), hemeroteca aún más extensa (Italia 90 cobertura argentina/italiana, infancia detalle), libros de Arcucci/Burns.
