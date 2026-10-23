import { Gauge, ShieldCheck, ArrowUpDown, Wifi, HeartHandshake, Timer } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  [Gauge, "Ultravelocidade", "Downloads, streaming 4K e jogos sem esperar."],
  [ShieldCheck, "Estabilidade", "Fibra não sofre com chuva nem interferência elétrica."],
  [ArrowUpDown, "Upload de verdade", "Ideal para home office, lives e backup na nuvem."],
  [Wifi, "Wi-Fi em toda casa", "Roteadores Wi-Fi 6 e opção mesh para cobrir tudo."],
  [HeartHandshake, "Suporte humanizado", "Atendimento local, de gente que conhece a sua cidade."],
  [Timer, "Instalação rápida", "Agendamos e instalamos em poucos dias."],
] as const;

export default function Features() {
  return (
    <section id="vantagens" className="bg-forest py-28">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tag text-lime">Vantagens</p>
            <h2 className="title mt-4 max-w-2xl">Por que quem tem INET não troca.</h2>
          </div>
          <p className="max-w-sm text-white/75">Tecnologia de ponta com o cuidado de uma empresa que é da região.</p>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.05} className="group bg-forest p-9 transition hover:bg-[#006200]">
              <Icon size={30} className="text-lime transition group-hover:scale-110" />
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-white/75">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
