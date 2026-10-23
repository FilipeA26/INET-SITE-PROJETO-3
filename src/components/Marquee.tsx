import { Zap } from "lucide-react";

const words = ["100% fibra óptica", "Wi-Fi 6", "Sem franquia", "Suporte local", "Instalação rápida", "Upload de verdade"];

/** Faixa verde-limão com texto correndo. */
export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden bg-lime py-5 text-navy" aria-hidden="true">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-extrabold italic sm:text-4xl">
            {w}
            <Zap className="text-forest" size={26} fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  );
}
