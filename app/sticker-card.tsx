import type { Sticker, StickerAccent } from "@/lib/stickers";

const ACCENT_BORDER: Record<StickerAccent, string> = {
  paper: "border-ink",
  blood: "border-blood",
  sun: "border-sun",
  celeste: "border-celeste-deep",
  ink: "border-ink",
  warm: "border-sepia",
  stamp: "border-blood",
  ten: "border-blood",
};

const ACCENT_DOT: Record<StickerAccent, string> = {
  paper: "bg-ink",
  blood: "bg-blood",
  sun: "bg-sun",
  celeste: "bg-celeste-deep",
  ink: "bg-ink",
  warm: "bg-sepia",
  stamp: "bg-blood",
  ten: "bg-blood",
};

export function StickerCard({ s, i }: { s: Sticker; i: number }) {
  const borderCls = ACCENT_BORDER[s.accent];
  const dotCls = ACCENT_DOT[s.accent];
  const rotation = ((i * 37) % 5) - 2; // pseudo-random -2..+2

  return (
    <article
      className="group relative bg-paper border border-rule shadow-[3px_3px_0_var(--color-sepia)] hover:shadow-[5px_5px_0_var(--color-blood)] transition-transform hover:scale-[1.04] hover:z-10 p-2"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* La foto OCUPA todo el card */}
      <div className={`relative aspect-square overflow-hidden border-2 ${borderCls} bg-paper-warm`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.img}
          alt={s.text}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover [filter:contrast(1.05)_saturate(0.92)] group-hover:[filter:contrast(1.15)_saturate(1)] transition-[filter] duration-300"
        />
      </div>

      {/* Caption afuera de la foto, abajo */}
      <div className="px-1 pt-3 pb-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-block w-2 h-2 ${dotCls}`} />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-muted">
            {s.year ?? "—"}
          </span>
        </div>
        <p
          className="font-display font-bold text-ink leading-[1.05] text-[clamp(0.85rem,1.6vw,1.05rem)]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {s.text}
        </p>
        {s.small && (
          <p className="font-display italic text-ink-soft text-[0.78rem] leading-tight mt-1">
            {s.small}
          </p>
        )}
      </div>
    </article>
  );
}
