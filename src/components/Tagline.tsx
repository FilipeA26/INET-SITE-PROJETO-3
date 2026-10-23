/** Faixa com o lema espaçado (ref. NETLines "CONNECTED. OPTIMIZED. RELIABLE."). */
const words = ["Conectado.", "Estável.", "Confiável.", "100% fibra.", "Feito em Minas."];

export default function Tagline() {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-royal py-6" aria-label="Conectado. Estável. Confiável.">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-16" aria-hidden="true">
        {row.map((w, i) => (
          <span key={i} className="whitespace-nowrap font-display text-2xl font-light uppercase tracking-[0.45em] text-white/90 sm:text-3xl">
            {w}
            <span className="ml-16 inline-block h-2 w-2 -translate-y-1.5 rounded-full bg-lime shadow-[0_0_12px_#70E000]" />
          </span>
        ))}
      </div>
    </div>
  );
}
