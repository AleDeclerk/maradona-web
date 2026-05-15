export type StickerAccent =
  | "paper"
  | "blood"
  | "sun"
  | "celeste"
  | "ink"
  | "warm"
  | "stamp"
  | "ten";

export interface Sticker {
  text: string;
  accent: StickerAccent;
  small?: string;
  year?: string;
  img: string;
}

export const WM = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

export const STICKERS: Sticker[] = [
  // Top 12 (los que abren la landing)
  { text: "La pelota no se mancha", accent: "paper", year: "2001", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Me cortaron las piernas", accent: "blood", year: "1994", img: "/moda-fotos/22-abrigo-blanco-frio.jpg" },
  { text: "Fue la mano de Dios", accent: "ink", year: "1986", img: WM("Maradona_mano_de_dios.jpg") },
  { text: "Barrilete cósmico", accent: "celeste", year: "1986", img: WM("Maradona_eludiendo_shilton.jpg") },
  { text: "D10S", accent: "blood", year: "—", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Que la chupen", accent: "sun", year: "2009", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Toqué el cielo con las manos", accent: "warm", year: "1976", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "La bronca es mi combustible", accent: "ink", year: "1995", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Tapado de piel en Moscú", accent: "ink", year: "1990", small: "2 AM Plaza Roja", img: "/moda-fotos/61-moscu-piel-1990.jpg" },
  { text: "Boina rosa", accent: "blood", year: "2018", small: "Mundial Rusia", img: WM("Maradona_in_Russia.jpg") },
  { text: "Mate con el viejo", accent: "warm", year: "—", img: "/moda-fotos/17-mate-con-don-diego.jpg" },
  { text: "Tatuaje del Che", accent: "blood", year: "—", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },

  // Resto
  { text: "Mis sueños son dos", accent: "paper", year: "1970", small: "Jugar y salir campeón", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Pelé hubo uno solo", accent: "stamp", year: "1986", small: "Los demás, segunda línea", img: WM("Maradona_pele_1979.jpg") },
  { text: "Te voy a contar un secreto, Shilton", accent: "blood", year: "1998", small: "Fue con la mano", img: WM("Maradona_shilton.jpg") },
  { text: "Grondona me mintió", accent: "ink", year: "2010", small: "Bilardo me traicionó", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "La 10 es mía", accent: "celeste", year: "1995", img: WM("Maradona_con_la_10_de_belgrano.jpg") },
  { text: "Dalma y Gianinna son mis ojos", accent: "warm", year: "1996", img: "/moda-fotos/03-familia-amigos.jpg" },
  { text: "Sin Claudia, estaría en el jonca", accent: "paper", year: "1996", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Gordito", accent: "sun", year: "1980", small: "Le voy a meter cuatro", img: "/moda-fotos/11-naipes-calle.jpg" },
  { text: "Cartonero Báez", accent: "ink", year: "1996", small: "Macri en Boca", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Cabeza de termo", accent: "blood", year: "1996", small: "Clinton no me deja entrar", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Se le escapó la tortuga", accent: "warm", year: "1997", small: "A Grondona", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Segurola y Habana 4310", accent: "celeste", year: "1995", small: "Séptimo piso", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Coppola fuma debajo del agua", accent: "paper", year: "2000", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Pelé debutó con un pibe", accent: "ink", year: "2000", img: WM("Maradona_pele_1979.jpg") },
  { text: "Más solo que Kung Fú", accent: "sun", year: "2000", small: "En Cuba", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Le pongo El Chavo", accent: "warm", year: "2001", small: "Y se me pasa el bajón", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Bush es un asesino", accent: "blood", year: "2005", small: "Prefiero a Fidel", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Soy izquierdista", accent: "ink", year: "2005", small: "De pie, de fe y de cerebro", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Stop Bush", accent: "blood", year: "2005", small: "Mar del Plata", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "ALCA al carajo", accent: "sun", year: "2005", small: "Cumbre 2005", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Peronista", accent: "celeste", year: "—", small: "Fui, soy y seré", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Crecí en un barrio privado", accent: "warm", year: "2004", small: "De luz, agua y teléfono", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Cabecita negra", accent: "ink", year: "—", small: "Nunca renegué de mis orígenes", img: WM("Diego_y_raul_maradona.jpg") },
  { text: "Blanco o negro", accent: "stamp", year: "2009", small: "Gris jamás", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Pelusa", accent: "sun", year: "—", small: "El apodo que más me va", img: "/moda-fotos/09-pelo-corto-fleco-revista.jpg" },
  { text: "Tota y Chitoro", accent: "warm", year: "—", small: "Mis viejos", img: "/moda-fotos/17-mate-con-don-diego.jpg" },
  { text: "10", accent: "ten", year: "—", small: "Eterna", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "San Diego de Fiorito", accent: "stamp", year: "—", img: WM("Street_in_Napoli_(3).jpg") },
  { text: "Te sigo amando", accent: "blood", year: "2005", small: "Aunque estés muerto", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Iglesia Maradoniana", accent: "celeste", year: "1998", small: "Rosario, 30/10", img: WM("Maradona_besa_camiseta.jpg") },
  { text: "Topo Gigio", accent: "sun", year: "1996", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "México 86", accent: "paper", year: "1986", small: "Campeón del Mundo", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Revancha de Malvinas", accent: "ink", year: "1986", img: WM("Maradona_celebrating_after_goal_of_century.jpg") },
  { text: "Argentina 2 - Inglaterra 1", accent: "celeste", year: "22/06/86", img: WM("Maradona_eludiendo_shilton.jpg") },
  { text: "Levanté la copa en el Azteca", accent: "sun", year: "1986", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Forza Napoli", accent: "celeste", year: "1987", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Sur italiano solo para el fútbol", accent: "warm", year: "1990", img: "/moda-fotos/61-moscu-piel-1990.jpg" },
  { text: "La vendetta se cumplió", accent: "blood", year: "1991", small: "Doping de Matarrese", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Stadio Diego Armando Maradona", accent: "celeste", year: "2020", img: WM("Street_in_Napoli_(3).jpg") },
  { text: "Live is Life", accent: "sun", year: "1989", small: "Cordones desatados", img: WM("Diego_Maradona_Napoli.JPG") },
  { text: "Templo del fútbol", accent: "warm", year: "2001", small: "La Bombonera", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Boca - River, distinto a todo", accent: "celeste", year: "—", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Como dormir con Julia Roberts", accent: "blood", year: "—", small: "Un Boca-River", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "10 años sin tomar drogas", accent: "paper", year: "2013", img: "/moda-fotos/40-vincha.jpg" },
  { text: "Qué jugador hubiera sido", accent: "ink", year: "—", small: "Sin la droga", img: "/moda-fotos/30-pelo-suelto-sevilla.jpg" },
  { text: "La droga te mata", accent: "blood", year: "1996", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Volver a nacer futbolista", accent: "warm", year: "1992", small: "Si me muero", img: "/moda-fotos/24-cinta-de-correr.jpg" },
  { text: "Los que me creían muerto", accent: "blood", year: "—", small: "Que se jodan", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Cuarenta años valen setenta", accent: "celeste", year: "2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Esto es demasiado para una persona", accent: "warm", year: "2001", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Vos también la tenés adentro", accent: "blood", year: "2009", small: "A Pasman", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Estos putos periodistas", accent: "ink", year: "2009", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Pelicortis", accent: "celeste", year: "1995", small: "Repudio a los rapados", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Pelo largo", accent: "stamp", year: "1995", small: "Historia del fútbol argentino", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Le agradezco a Dalma y Gianinna", accent: "paper", year: "—", img: "/moda-fotos/35-con-dalma-bombonera.jpg" },
  { text: "Havelange waterpolo", accent: "blood", year: "—", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "FIFA hijos de puta", accent: "ink", year: "1990", img: "/moda-fotos/50-grondona-presentacion-dt.jpg" },
  { text: "Blatter, hijo de puta", accent: "blood", year: "—", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Bailaba con lobos en La Habana", accent: "warm", year: "—", small: "La Pradera 2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Fidel en la pierna", accent: "ink", year: "—", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Barrilete", accent: "celeste", year: "—", img: WM("Maradona_celebrating_after_goal_of_century.jpg") },
  { text: "El Pibe de Oro", accent: "sun", year: "—", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "El Diez", accent: "stamp", year: "—", img: WM("Maradona_con_la_10_de_belgrano.jpg") },
  { text: "El Diego", accent: "paper", year: "—", img: "/moda-fotos/42-debut-tv-pele-noche-10.jpg" },
  { text: "Si la gente me sigue queriendo", accent: "warm", year: "2020", small: "Última entrevista", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "El fútbol me dio todo", accent: "paper", year: "2020", img: "/moda-fotos/54-perilla-conferencia.jpg" },
  { text: "Bailar con tu hermana", accent: "stamp", year: "2001", small: "No poder patear al arco", img: "/moda-fotos/41-palco-bombonera.jpg" },
  { text: "Fanático de Versace", accent: "stamp", year: "90s", img: "/moda-fotos/71-versace-1.jpg" },
  { text: "Versace forever", accent: "blood", year: "90s", img: "/moda-fotos/71-versace-2.jpg" },
  { text: "Camisa estampada", accent: "sun", year: "90s", img: "/moda-fotos/71-versace-3.jpg" },
  { text: "Cadenas de oro", accent: "ink", year: "90s", img: "/moda-fotos/71-versace-8.jpg" },
  { text: "Cannes", accent: "ink", year: "2008", small: "Alfombra roja", img: "/moda-fotos/47-cannes-red-carpet.jpg" },
  { text: "Sunga playa", accent: "celeste", year: "80s", img: "/moda-fotos/19-sunga-playa-vacaciones.jpg" },
  { text: "Vincha", accent: "warm", year: "2000", img: "/moda-fotos/40-vincha.jpg" },
  { text: "Rubio total", accent: "sun", year: "1995", img: "/moda-fotos/37-rubio-total-grito.jpg" },
  { text: "Abrigo blanco europeo", accent: "paper", year: "80s", img: "/moda-fotos/22-abrigo-blanco-frio.jpg" },
  { text: "Las 7 canchitas", accent: "sun", year: "—", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "Cebollitas", accent: "celeste", year: "1973–74", small: "Invicto 136 partidos", img: "/moda-fotos/01-cebollita.jpg" },
  { text: "Argentinos Juniors", accent: "paper", year: "1976–81", img: WM("Maradona_argentinos_vs_velez.jpg") },
  { text: "Villa Fiorito", accent: "warm", year: "—", img: "/moda-fotos/02-vacaciones-familia-1970.jpg" },
  { text: "Diego Armando Maradona", accent: "blood", year: "1960–2020", img: WM("Maradona-Mundial_86_con_la_copa.JPG") },
  { text: "Sabina y Charly", accent: "warm", year: "2005", small: "La Noche del 10", img: "/moda-fotos/45-sabina-charly-noche-10.jpg" },
  { text: "Bandera + puro habano", accent: "blood", year: "2005", img: "/moda-fotos/49-tatuaje-che-puro-bandera.jpg" },
  { text: "Castro en La Habana", accent: "ink", year: "2000", img: "/moda-fotos/44-castro-habana.jpg" },
  { text: "Chávez en Mar del Plata", accent: "celeste", year: "2005", img: "/moda-fotos/43-chavez-mar-del-plata-2005.jpg" },
  { text: "Premio Sport Oscar", accent: "stamp", year: "1979", small: "Balón de Oro Sub-20", img: WM("Maradona_balon_oro_1979.jpg") },
  { text: "Piazzolla en París", accent: "warm", year: "1981", img: WM("Piazzolla_maradona_jairo_en_paris.jpg") },
  { text: "Con Queen", accent: "ink", year: "1981", img: WM("Freddie_Mercury_and_Diego_Maradona.jpg") },
];
