import { Check } from "lucide-react";
import Reveal from "./Reveal";
import Orbit from "./Orbit";
import { waLink } from "../lib";

// Valores provisórios — trocar pelos planos reais da INET
const plans = [
  { speed: "400", unit: "Mega", price: "89,90", ideal: "Para casas conectadas", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia"] },
  { speed: "700", unit: "Mega", price: "109,90", ideal: "Para quem joga e faz streaming", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia", "Suporte prioritário"], featured: true },
  { speed: "1", unit: "Giga", price: "149,90", ideal: "Para home office e famílias grandes", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia", "Suporte VIP"] },
];

export default function Plans() {
  return (
    <section id="planos" className="relative overflow-hidden bg-royal py-28">
      <Orbit className="pointer-events-none absolute -left-40 top-10 w-[700px] opacity-20" />
      <div className="container-x relative">
        <Reveal className="text-center">
          <p className="tag text-lime">Planos</p>
          <h2 className="title mx-auto mt-4 max-w-3xl">Escolha quanta luz você quer em casa.</h2>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.speed + p.unit} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col rounded-[2rem] p-8 transition duration-300 hover:-translate-y-2 ${
                  p.featured ? "bg-lime text-navy shadow-[0_30px_80px_-30px_rgba(112,224,0,0.9)] md:-mt-6 md:pb-14" : "bg-navy text-white"
                }`}
              >
                {p.featured && <span className="tag mb-4 w-fit rounded-full bg-navy px-3 py-1 text-[10px] text-lime">Mais escolhido</span>}
                <p className={`text-sm ${p.featured ? "text-navy/70" : "text-white/60"}`}>{p.ideal}</p>
                <p className="mt-4 font-display text-7xl font-extrabold italic leading-none">
                  {p.speed}
                  <span className={`ml-1 text-3xl ${p.featured ? "text-forest" : "text-lime"}`}>{p.unit}</span>
                </p>
                <p className="mt-8 font-display text-4xl font-bold">
                  R$ {p.price}
                  <span className={`text-base font-normal ${p.featured ? "text-navy/60" : "text-white/50"}`}>/mês</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <Check size={16} strokeWidth={3} className={p.featured ? "text-forest" : "text-lime"} /> {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Olá! Quero o plano de ${p.speed} ${p.unit} da INET.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-10 ${p.featured ? "btn-navy" : "btn-lime"}`}
                >
                  Assinar agora
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
