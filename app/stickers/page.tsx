import Link from "next/link";
import { getPagesByCategory } from "@/lib/wiki";

export const metadata = {
  title: "Stickers · Maradona",
  description:
    "100 stickers tipográficos de Diego — diseñados in-house con las frases canónicas. Pulsá uno y entrá al contexto.",
};

type Variant =
  | "paper"
  | "blood"
  | "sun"
  | "celeste"
  | "ink"
  | "warm"
  | "stamp"
  | "ten";

interface Sticker {
  text: string;
  variant: Variant;
  small?: string;
  year?: string;
  slug?: string; // link a página existente del vault
}

const STICKERS: Sticker[] = [
  // Mítica top
  { text: "La pelota no se mancha", variant: "paper", year: "2001", slug: "la-pelota-no-se-mancha-sticker" },
  { text: "Me cortaron las piernas", variant: "blood", year: "1994", slug: "me-cortaron-las-piernas-sticker" },
  { text: "Fue la mano de Dios", variant: "ink", year: "1986", slug: "mano-de-dios-sticker" },
  { text: "Barrilete cósmico", variant: "celeste", year: "1986", slug: "barrilete-cosmico" },
  { text: "D10S", variant: "blood", year: "—", slug: "d10s" },
  { text: "Que la chupen", variant: "sun", year: "2009", slug: "que-la-chupen-sticker" },
  { text: "Toqué el cielo con las manos", variant: "warm", year: "1976" },
  { text: "La bronca es mi combustible", variant: "ink", year: "1995" },

  // Frases largas que entran cortas
  { text: "Mis sueños son dos", variant: "paper", year: "1970", small: "Jugar y salir campeón del Mundial" },
  { text: "Pelé hubo uno solo", variant: "stamp", year: "1986", small: "Los demás venimos en segunda línea" },
  { text: "Te voy a contar un secreto, Shilton", variant: "blood", year: "1998", small: "Fue con la mano" },
  { text: "Grondona me mintió", variant: "ink", year: "2010", small: "Bilardo me traicionó" },
  { text: "Pase lo que pase, la 10 es mía", variant: "celeste", year: "1995" },
  { text: "Dalma y Gianinna son mis ojos", variant: "warm", year: "1996" },
  { text: "Sin Claudia, estaría en el jonca", variant: "paper", year: "1996" },

  // Insultos y bromas
  { text: "Gordito", variant: "sun", year: "1980", small: "Le voy a meter cuatro" },
  { text: "Cartonero Báez", variant: "ink", year: "1996", small: "Macri en Boca" },
  { text: "Cabeza de termo", variant: "blood", year: "1996", small: "Clinton no me deja entrar" },
  { text: "Se le escapó la tortuga", variant: "warm", year: "1997", small: "A Grondona" },
  { text: "Segurola y Habana 4310", variant: "celeste", year: "1995", small: "Séptimo piso" },
  { text: "Coppola fuma debajo del agua", variant: "paper", year: "2000" },
  { text: "Verón tiene más faltas que Gianinna", variant: "stamp", year: "2000" },
  { text: "Pelé debutó con un pibe", variant: "ink", year: "2000" },
  { text: "Más solo que Kung Fú", variant: "sun", year: "2000", small: "En Cuba" },
  { text: "Le pongo El Chavo", variant: "warm", year: "2001", small: "y se me pasa el bajón" },

  // Política
  { text: "Bush es un asesino", variant: "blood", year: "2005", small: "Prefiero a Fidel" },
  { text: "Soy izquierdista", variant: "ink", year: "2005", small: "De pie, de fe y de cerebro" },
  { text: "Stop Bush", variant: "blood", year: "2005", small: "Mar del Plata" },
  { text: "ALCA al carajo", variant: "sun", year: "2005", small: "Cumbre 2005" },
  { text: "Fui, soy y seré peronista", variant: "celeste", year: "—" },
  { text: "Echemos a Bush", variant: "blood", year: "2005" },

  // Identidad
  { text: "Yo nací en Lanús", variant: "paper", year: "—" },
  { text: "Crecí en un barrio privado", variant: "warm", year: "2004", small: "De luz, agua y teléfono" },
  { text: "Cabecita negra", variant: "ink", year: "—", small: "Nunca renegué de mis orígenes" },
  { text: "Blanco o negro, gris jamás", variant: "stamp", year: "2009" },
  { text: "Pelusa", variant: "sun", year: "—", small: "El apodo que más me va" },
  { text: "Tota y Chitoro", variant: "warm", year: "—", small: "Mis viejos" },

  // Iglesia y mística
  { text: "10", variant: "ten", year: "—", small: "Eterna" },
  { text: "San Diego", variant: "stamp", year: "—", small: "De Fiorito" },
  { text: "Aunque estés muerto, te sigo amando", variant: "blood", year: "2005", slug: "santo-popular" },
  { text: "Iglesia Maradoniana", variant: "celeste", year: "1998", small: "Rosario, 30/10/1998" },
  { text: "Topo Gigio", variant: "sun", year: "1996", slug: "topo-gigio" },

  // Mundial 86
  { text: "México 86", variant: "paper", year: "1986", small: "Campeón del Mundo" },
  { text: "Hijos de puta, ¡no!", variant: "blood", year: "1986", small: "Cumbia en el Azteca" },
  { text: "Habían matado pibes argentinos", variant: "ink", year: "1986", small: "Esto fue una revancha" },
  { text: "Argentina 2 - Inglaterra 1", variant: "celeste", year: "22/06/1986" },
  { text: "Levanté la copa en el Azteca", variant: "sun", year: "1986" },

  // Italia / Napoli
  { text: "Forza Napoli", variant: "celeste", year: "1987" },
  { text: "El sur se siente italiano solo para el fútbol", variant: "warm", year: "1990" },
  { text: "La vendetta se cumplió", variant: "blood", year: "1991", small: "Doping de Matarrese" },
  { text: "Mi Napoli a esta Juve le hacía cuatro", variant: "stamp", year: "—" },
  { text: "Stadio Diego Armando Maradona", variant: "celeste", year: "2020" },
  { text: "Live is Life", variant: "sun", year: "1989", small: "Cordones desatados" },

  // Boca
  { text: "Bostero", variant: "sun", year: "—" },
  { text: "Le agradezco a Dios que me haya hecho de Boca", variant: "ink", year: "2001" },
  { text: "Templo del fútbol", variant: "warm", year: "2001", small: "La Bombonera" },
  { text: "Boca - River, distinto a todo", variant: "celeste", year: "—" },
  { text: "Como dormir con Julia Roberts", variant: "blood", year: "—", small: "Un Boca-River" },

  // Drogas / lucha
  { text: "10 años sin tomar drogas", variant: "paper", year: "2013" },
  { text: "Si no me hubiera drogado", variant: "ink", year: "—", small: "Qué jugador hubiese sido" },
  { text: "La droga te mata", variant: "blood", year: "1996" },
  { text: "Pac-Man de la familia", variant: "stamp", year: "1996" },

  // Existenciales
  { text: "Si me muero quiero volver a nacer futbolista", variant: "warm", year: "1992" },
  { text: "Los que me creían muerto, que se jodan", variant: "blood", year: "—" },
  { text: "Cuarenta años que valen setenta", variant: "celeste", year: "2000" },
  { text: "He vivido más de lo que pude soñar", variant: "paper", year: "2020" },
  { text: "Esto es demasiado para una persona", variant: "warm", year: "2001" },

  // Periodismo
  { text: "Vos también la tenés adentro", variant: "blood", year: "2009", small: "A Pasman" },
  { text: "Estos putos periodistas", variant: "ink", year: "2009" },
  { text: "Niembro: yo abandono", variant: "sun", year: "2004" },
  { text: "Pelicortis", variant: "celeste", year: "1995", small: "Repudio a los rapados" },
  { text: "Historia con pelo largo", variant: "stamp", year: "1995", small: "Vs. Passarella" },

  // Familia
  { text: "Mi vieja decía que le dolía la panza", variant: "warm", year: "2003", small: "No comía para darnos de comer" },
  { text: "Le agradezco a Dalma y Gianinna", variant: "paper", year: "—" },

  // FIFA / dirigentes
  { text: "Havelange waterpolo", variant: "blood", year: "—" },
  { text: "Hijos de puta", variant: "ink", year: "1990", small: "FIFA" },
  { text: "Blatter, hijo de puta", variant: "blood", year: "—" },
  { text: "Prefiero ser huérfano a miembro de FIFA", variant: "ink", year: "—" },

  // Cuba y exilio
  { text: "Bailaba con lobos en La Habana", variant: "warm", year: "—", small: "La Pradera 2000" },
  { text: "En Cuba jugando al golf", variant: "celeste", year: "2003", small: "En mi puta vida pensé" },
  { text: "Tatuaje del Che", variant: "blood", year: "—", slug: "tatuaje-che" },
  { text: "Fidel en la pierna", variant: "ink", year: "—" },

  // Apodos
  { text: "Barrilete", variant: "celeste", year: "—" },
  { text: "El Pibe de Oro", variant: "sun", year: "—" },
  { text: "Pelusa", variant: "warm", year: "—" },
  { text: "El Diez", variant: "stamp", year: "—" },
  { text: "El Diego", variant: "paper", year: "—" },

  // Reflexión final
  { text: "Quiero que la gente me siga queriendo", variant: "warm", year: "2020", small: "Última entrevista" },
  { text: "El fútbol me dio todo", variant: "paper", year: "2020" },
  { text: "Esto es lo peor que nos pudo pasar", variant: "ink", year: "2020", small: "Pandemia" },

  // Mundial 78 y exclusión
  { text: "Menotti me dejó afuera del 78", variant: "blood", year: "1978" },
  { text: "El cuarto 10", variant: "ink", year: "1978", small: "Lo que pensó Menotti" },

  // Tácticos / fútbol
  { text: "Bailar con tu hermana", variant: "stamp", year: "2001", small: "No poder patear al arco" },
  { text: "Telegrama", variant: "warm", year: "1997", small: "Menos palabras que" },
  { text: "Foto carnet", variant: "celeste", year: "1997", small: "Tengo menos piernas que" },

  // Levantando
  { text: "Levantando la Copa", variant: "sun", year: "1986", slug: "levantando-la-copa" },
  { text: "Mano de Dios", variant: "ink", year: "1986", slug: "mano-de-dios-sticker" },
  { text: "Pim, pam, palo, travesaño", variant: "warm", year: "2004", small: "Vs. Brasil Italia 90" },

  // Generales
  { text: "Diego Armando Maradona", variant: "blood", year: "1960–2020" },
  { text: "Villa Fiorito", variant: "warm", year: "—" },
  { text: "Las 7 canchitas", variant: "sun", year: "—" },
  { text: "Cebollitas", variant: "celeste", year: "1973–74", small: "Invicto 136 partidos" },
  { text: "Argentinos Juniors", variant: "paper", year: "1976–81" },
];

const VARIANT_CLASSES: Record<Variant, string> = {
  paper: "bg-paper-warm text-ink border-ink",
  blood: "bg-blood text-paper border-blood",
  sun: "bg-sun text-ink border-ink",
  celeste: "bg-celeste text-ink border-ink",
  ink: "bg-ink text-paper border-ink",
  warm: "bg-paper-deep text-sepia border-sepia",
  stamp: "bg-paper text-blood border-blood",
  ten: "bg-blood text-sun border-sun",
};

function StickerCard({ s, i }: { s: Sticker; i: number }) {
  const cls = VARIANT_CLASSES[s.variant];
  const rotation = ((i * 37) % 5) - 2; // -2..+2 grados, pseudo-random estable
  const isShort = s.text.length <= 14;
  const isTen = s.variant === "ten";
  const isStamp = s.variant === "stamp";

  return (
    <article
      className={`relative aspect-square border-2 ${cls} p-4 flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.03] hover:z-10 shadow-[3px_3px_0_var(--color-sepia)] hover:shadow-[5px_5px_0_var(--color-blood)]`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Watermark "10" background for "ten" variant */}
      {isTen && (
        <span className="absolute inset-0 flex items-center justify-center text-[18rem] leading-none font-display font-black opacity-30 select-none pointer-events-none">
          10
        </span>
      )}

      {/* Stamp double-border */}
      {isStamp && (
        <span className="absolute inset-2 border border-current pointer-events-none" />
      )}

      {/* Top metadata */}
      <div className="relative flex justify-between items-start text-[0.6rem] font-mono uppercase tracking-[0.14em] opacity-80">
        <span>{s.year ?? "—"}</span>
        <span>D·10·S</span>
      </div>

      {/* Main text */}
      <div className="relative flex-1 flex items-center justify-center text-center px-1">
        <p
          className={`font-display font-black leading-[0.95] ${
            isShort
              ? "text-[clamp(1.5rem,5vw,2.75rem)]"
              : "text-[clamp(0.95rem,2.2vw,1.4rem)]"
          }`}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1' }}
        >
          {s.text}
        </p>
      </div>

      {/* Small caption */}
      {s.small && (
        <p className="relative text-[0.62rem] font-mono uppercase tracking-[0.1em] opacity-80 text-center leading-tight">
          {s.small}
        </p>
      )}

      {!s.small && (
        <p className="relative text-[0.6rem] font-mono uppercase tracking-[0.14em] opacity-60 text-center">
          —
        </p>
      )}
    </article>
  );
}

export default function StickersGalleryPage() {
  const wikiPages = getPagesByCategory("stickers");
  const pageBySlug = new Map(wikiPages.map((p) => [p.slug, p]));

  return (
    <div className="fade-up">
      <Link
        href="/"
        className="link-grow font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-blood"
      >
        ← Inicio
      </Link>

      <div className="mt-4 mb-8 text-center">
        <p className="h-eyebrow mb-2">Galería</p>
        <h1 className="h-display text-[clamp(2.5rem,7vw,5rem)] leading-none">
          Stickers
        </h1>
        <p className="font-display italic text-ink-soft mt-2 text-lg">
          {STICKERS.length} piezas tipográficas · Hechas a mano para esta wiki
        </p>
        <div className="mt-4 mx-auto w-20 h-px bg-ink" />
        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted max-w-md mx-auto">
          Diseño in-house. Sin descargar packs con copyright. Click para entrar a la ficha.
        </p>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {STICKERS.map((s, i) => {
          const wikiPage = s.slug ? pageBySlug.get(s.slug) : null;
          const href = wikiPage ? `/stickers/${wikiPage.slug}` : "#";
          if (!wikiPage) {
            return <StickerCard key={i} s={s} i={i} />;
          }
          return (
            <Link key={i} href={href} className="block">
              <StickerCard s={s} i={i} />
            </Link>
          );
        })}
      </section>

      {/* Vault references */}
      {wikiPages.length > 0 && (
        <section className="mt-12 pt-6 border-t-2 border-ink">
          <h2 className="h-section text-xl mb-3">Fichas detalladas en el vault</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {wikiPages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/stickers/${p.slug}`}
                  className="link-grow text-ink hover:text-blood"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
        Stickers diseñados con Fraunces · Paleta editorial vintage
      </p>
    </div>
  );
}
