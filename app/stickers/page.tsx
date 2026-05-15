import Link from "next/link";
import { getPagesByCategory } from "@/lib/wiki";

export const metadata = {
  title: "Stickers · Maradona",
  description:
    "Stickers visuales de Diego — foto + frase encima.",
};

type Overlay = "blood" | "ink" | "celeste" | "sun" | "paper" | "warm" | "stamp" | "ten";

interface Sticker {
  text: string;
  overlay: Overlay;
  small?: string;
  year?: string;
  img: string;
}

const WM = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

const STICKERS: Sticker[] = [
  { text: "La pelota no se mancha", overlay: "paper", year: "2001", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Me cortaron las piernas", overlay: "blood", year: "1994", img: "/moda-fotos/22-abrigo-blanco-frio.jpg" },
  { text: "Fue la mano de Dios", overlay: "ink", year: "1986", img: WM("Maradona_mano_de_dios.jpg") },
  { text: "Barrilete cósmico", overlay: "celeste", year: "1986", img: WM("Maradona_eludiendo_shilton.jpg") },
  { text: "D10S", overlay: "blood", year: "—", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Que la chupen", overlay: "sun", year: "2009", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Toqué el cielo con las manos", overlay: "warm", year: "1976", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "La bronca es mi combustible", overlay: "ink", year: "1995", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Mis sueños son dos", overlay: "paper", year: "1970", small: "Jugar y salir campeón", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Pelé hubo uno solo", overlay: "stamp", year: "1986", small: "Los demás, segunda línea", img: WM("Maradona_pele_1979.jpg") },
  { text: "Te voy a contar un secreto, Shilton", overlay: "blood", year: "1998", small: "Fue con la mano", img: WM("Maradona_shilton.jpg") },
  { text: "Grondona me mintió", overlay: "ink", year: "2010", small: "Bilardo me traicionó", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "La 10 es mía", overlay: "celeste", year: "1995", img: WM("Maradona_con_la_10_de_belgrano.jpg") },
  { text: "Dalma y Gianinna son mis ojos", overlay: "warm", year: "1996", img: "/moda-fotos/03-familia-amigos.jpg" },
  { text: "Sin Claudia, estaría en el jonca", overlay: "paper", year: "1996", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Gordito", overlay: "sun", year: "1980", small: "Le voy a meter cuatro", img: "/moda-fotos/11-naipes-calle.jpg" },
  { text: "Cartonero Báez", overlay: "ink", year: "1996", small: "Macri en Boca", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Cabeza de termo", overlay: "blood", year: "1996", small: "Clinton no me deja entrar", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Se le escapó la tortuga", overlay: "warm", year: "1997", small: "A Grondona", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Segurola y Habana 4310", overlay: "celeste", year: "1995", small: "Séptimo piso", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Coppola fuma debajo del agua", overlay: "paper", year: "2000", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Pelé debutó con un pibe", overlay: "ink", year: "2000", img: WM("Maradona_pele_1979.jpg") },
  { text: "Más solo que Kung Fú", overlay: "sun", year: "2000", small: "En Cuba", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Le pongo El Chavo", overlay: "warm", year: "2001", small: "Y se me pasa el bajón", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Bush es un asesino", overlay: "blood", year: "2005", small: "Prefiero a Fidel", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Soy izquierdista", overlay: "ink", year: "2005", small: "De pie, de fe y de cerebro", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Stop Bush", overlay: "blood", year: "2005", small: "Mar del Plata", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "ALCA al carajo", overlay: "sun", year: "2005", small: "Cumbre 2005", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Peronista", overlay: "celeste", year: "—", small: "Fui, soy y seré", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Echemos a Bush", overlay: "blood", year: "2005", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Crecí en un barrio privado", overlay: "warm", year: "2004", small: "De luz, agua y teléfono", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Cabecita negra", overlay: "ink", year: "—", small: "Nunca renegué de mis orígenes", img: WM("Diego_y_raul_maradona.jpg") },
  { text: "Blanco o negro", overlay: "stamp", year: "2009", small: "Gris jamás", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Pelusa", overlay: "sun", year: "—", small: "El apodo que más me va", img: "/moda-fotos/09-pelo-corto-fleco-revista.jpg" },
  { text: "Tota y Chitoro", overlay: "warm", year: "—", small: "Mis viejos", img: "/moda-fotos/17-mate-con-don-diego.jpg" },
  { text: "10", overlay: "ten", year: "—", small: "Eterna", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "San Diego de Fiorito", overlay: "stamp", year: "—", img: WM("Street_in_Napoli_(3).jpg") },
  { text: "Te sigo amando", overlay: "blood", year: "2005", small: "Aunque estés muerto", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Iglesia Maradoniana", overlay: "celeste", year: "1998", small: "Rosario, 30/10", img: WM("Maradona_besa_camiseta.jpg") },
  { text: "Topo Gigio", overlay: "sun", year: "1996", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "México 86", overlay: "paper", year: "1986", small: "Campeón del Mundo", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Revancha de Malvinas", overlay: "ink", year: "1986", img: WM("Maradona_celebrating_after_goal_of_century.jpg") },
  { text: "Argentina 2 - Inglaterra 1", overlay: "celeste", year: "22/06/86", img: WM("Maradona_eludiendo_shilton.jpg") },
  { text: "Levanté la copa en el Azteca", overlay: "sun", year: "1986", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Forza Napoli", overlay: "celeste", year: "1987", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Sur italiano solo para el fútbol", overlay: "warm", year: "1990", img: "/moda-fotos/61-moscu-piel-1990.jpg" },
  { text: "La vendetta se cumplió", overlay: "blood", year: "1991", small: "Doping de Matarrese", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Stadio Diego Armando Maradona", overlay: "celeste", year: "2020", img: WM("Street_in_Napoli_(3).jpg") },
  { text: "Live is Life", overlay: "sun", year: "1989", small: "Cordones desatados", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Templo del fútbol", overlay: "warm", year: "2001", small: "La Bombonera", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Boca - River, distinto a todo", overlay: "celeste", year: "—", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Como dormir con Julia Roberts", overlay: "blood", year: "—", small: "Un Boca-River", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "10 años sin tomar drogas", overlay: "paper", year: "2013", img: "/moda-fotos/40-vincha.jpg" },
  { text: "Qué jugador hubiera sido", overlay: "ink", year: "—", small: "Sin la droga", img: "/moda-fotos/30-pelo-suelto-sevilla.jpg" },
  { text: "La droga te mata", overlay: "blood", year: "1996", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Volver a nacer futbolista", overlay: "warm", year: "1992", small: "Si me muero", img: "/moda-fotos/24-cinta-de-correr.jpg" },
  { text: "Los que me creían muerto", overlay: "blood", year: "—", small: "Que se jodan", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Cuarenta años valen setenta", overlay: "celeste", year: "2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Esto es demasiado para una persona", overlay: "warm", year: "2001", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Vos también la tenés adentro", overlay: "blood", year: "2009", small: "A Pasman", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Estos putos periodistas", overlay: "ink", year: "2009", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Pelicortis", overlay: "celeste", year: "1995", small: "Repudio a los rapados", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Pelo largo", overlay: "stamp", year: "1995", small: "Historia del fútbol argentino", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Mate con el viejo", overlay: "warm", year: "—", img: "/moda-fotos/17-mate-con-don-diego.jpg" },
  { text: "Le agradezco a Dalma y Gianinna", overlay: "paper", year: "—", img: "/moda-fotos/35-con-dalma-bombonera.jpg" },
  { text: "Havelange waterpolo", overlay: "blood", year: "—", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "FIFA hijos de puta", overlay: "ink", year: "1990", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Blatter, hijo de puta", overlay: "blood", year: "—", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Bailaba con lobos en La Habana", overlay: "warm", year: "—", small: "La Pradera 2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Tatuaje del Che", overlay: "blood", year: "—", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Fidel en la pierna", overlay: "ink", year: "—", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Barrilete", overlay: "celeste", year: "—", img: WM("Maradona_celebrating_after_goal_of_century.jpg") },
  { text: "El Pibe de Oro", overlay: "sun", year: "—", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "El Diez", overlay: "stamp", year: "—", img: WM("Maradona_con_la_10_de_belgrano.jpg") },
  { text: "El Diego", overlay: "paper", year: "—", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Si la gente me sigue queriendo", overlay: "warm", year: "2020", small: "Última entrevista", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "El fútbol me dio todo", overlay: "paper", year: "2020", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Bailar con tu hermana", overlay: "stamp", year: "2001", small: "No poder patear al arco", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Fanático de Versace", overlay: "stamp", year: "90s", img: "/moda-fotos/71-versace-1.jpg" },
  { text: "Versace forever", overlay: "blood", year: "90s", img: "/moda-fotos/71-versace-2.jpg" },
  { text: "Camisa estampada", overlay: "sun", year: "90s", img: "/moda-fotos/71-versace-3.jpg" },
  { text: "Cadenas de oro", overlay: "ink", year: "90s", img: "/moda-fotos/71-versace-8.jpg" },
  { text: "Tapado de piel en Moscú", overlay: "ink", year: "1990", small: "2 AM Plaza Roja", img: "/moda-fotos/61-moscu-piel-1990.jpg" },
  { text: "Boina rosa", overlay: "blood", year: "2018", small: "Mundial Rusia", img: WM("Maradona_in_Russia.jpg") },
  { text: "Cannes", overlay: "ink", year: "2008", small: "Alfombra roja", img: "/moda-fotos/47-cannes-red-carpet.jpg" },
  { text: "Sunga playa", overlay: "celeste", year: "80s", img: "/moda-fotos/19-sunga-playa-vacaciones.jpg" },
  { text: "Vincha", overlay: "warm", year: "2000", img: "/moda-fotos/40-vincha.jpg" },
  { text: "Rubio total", overlay: "sun", year: "1995", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Abrigo blanco europeo", overlay: "paper", year: "80s", img: "/moda-fotos/22-abrigo-blanco-frio.jpg" },
  { text: "Las 7 canchitas", overlay: "sun", year: "—", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "Cebollitas", overlay: "celeste", year: "1973–74", small: "Invicto 136 partidos", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "Argentinos Juniors", overlay: "paper", year: "1976–81", img: WM("Maradona_argentinos_vs_velez.jpg") },
  { text: "Villa Fiorito", overlay: "warm", year: "—", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Diego Armando Maradona", overlay: "blood", year: "1960–2020", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Pibe de Oro", overlay: "sun", year: "—", img: "/moda-fotos/09-pelo-corto-fleco-revista.jpg" },
  { text: "Sabina y Charly", overlay: "warm", year: "2005", small: "La Noche del 10", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Bandera + puro habano", overlay: "blood", year: "2005", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Castro en La Habana", overlay: "ink", year: "2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Chávez en Mar del Plata", overlay: "celeste", year: "2005", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Premio Sport Oscar", overlay: "stamp", year: "1979", small: "Balón de Oro Sub-20", img: WM("Maradona_balon_oro_1979.jpg") },
  { text: "Piazzolla en París", overlay: "warm", year: "1981", img: WM("Piazzolla_maradona_jairo_en_paris.jpg") },
  { text: "Con Queen", overlay: "ink", year: "1981", img: WM("Freddie_Mercury_and_Diego_Maradona.jpg") },
];

const OVERLAY_CLASSES: Record<Overlay, { bg: string; text: string }> = {
  paper: { bg: "bg-paper-warm/85", text: "text-ink" },
  blood: { bg: "bg-blood/85", text: "text-paper" },
  sun: { bg: "bg-sun/85", text: "text-ink" },
  celeste: { bg: "bg-celeste/85", text: "text-ink" },
  ink: { bg: "bg-ink/80", text: "text-paper" },
  warm: { bg: "bg-paper-deep/80", text: "text-sepia" },
  stamp: { bg: "bg-paper/80", text: "text-blood" },
  ten: { bg: "bg-blood/85", text: "text-sun" },
};

function StickerCard({ s, i }: { s: Sticker; i: number }) {
  const cls = OVERLAY_CLASSES[s.overlay];
  const rotation = ((i * 37) % 5) - 2;
  const isShort = s.text.length <= 14;
  const isTen = s.overlay === "ten";
  const isStamp = s.overlay === "stamp";

  return (
    <article
      className="relative aspect-square overflow-hidden shadow-[3px_3px_0_var(--color-sepia)] hover:shadow-[5px_5px_0_var(--color-blood)] transition-transform hover:scale-[1.04] hover:z-10 border-2 border-ink"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.img}
        alt={s.text}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover [filter:contrast(1.1)_saturate(0.9)_sepia(0.1)]"
      />

      <div className={`absolute inset-0 ${cls.bg}`} />

      {isTen && (
        <span className="absolute inset-0 flex items-center justify-center text-[14rem] leading-none font-display font-black opacity-30 select-none pointer-events-none text-sun">
          10
        </span>
      )}

      {isStamp && (
        <span className="absolute inset-2 border border-current pointer-events-none" />
      )}

      <div className={`relative flex flex-col h-full ${cls.text}`}>
        <div className="flex justify-between items-start p-3 text-[0.6rem] font-mono uppercase tracking-[0.14em] opacity-90">
          <span>{s.year ?? "—"}</span>
          <span>D·10·S</span>
        </div>

        <div className="flex-1 flex items-center justify-center text-center px-3">
          <p
            className={`font-display font-black leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
              isShort
                ? "text-[clamp(1.5rem,5vw,2.8rem)]"
                : "text-[clamp(0.95rem,2.4vw,1.5rem)]"
            }`}
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1' }}
          >
            {s.text}
          </p>
        </div>

        <div className="p-3">
          {s.small ? (
            <p className="text-[0.62rem] font-mono uppercase tracking-[0.1em] opacity-95 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {s.small}
            </p>
          ) : (
            <p className="text-[0.6rem] font-mono uppercase tracking-[0.14em] opacity-50 text-center">—</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function StickersGalleryPage() {
  const wikiPages = getPagesByCategory("stickers");

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
          {STICKERS.length} piezas · Foto + frase
        </p>
        <div className="mt-4 mx-auto w-20 h-px bg-ink" />
        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted max-w-md mx-auto">
          Cada sticker = foto real de Diego + frase canónica overlay.
        </p>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {STICKERS.map((s, i) => (
          <StickerCard key={i} s={s} i={i} />
        ))}
      </section>

      {wikiPages.length > 0 && (
        <section className="mt-12 pt-6 border-t-2 border-ink">
          <h2 className="h-section text-xl mb-3">Fichas detalladas</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {wikiPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/stickers/${p.slug}`} className="link-grow text-ink hover:text-blood">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
