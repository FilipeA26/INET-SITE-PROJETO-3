import { Quote } from "lucide-react";
import Reveal from "./Reveal";

// Depoimentos provisórios — substituir por avaliações reais de clientes
const items = [
  ["Mariana S.", "Home office", "Minhas reuniões nunca mais travaram. E quando precisei, o suporte resolveu no mesmo dia."],
  ["Carlos A.", "Gamer", "Ping baixo e estável o tempo todo. Fibra de verdade faz muita diferença nos jogos online."],
  ["Padaria Pão Nosso", "Empresa", "Maquininhas, câmeras e Wi-Fi para os clientes funcionando sem parar."],
];

export default function Testimonials() {
  return (
    <section className="bg-navy py-28">
      <div className="container-x">
        <Reveal>
          <p className="tag text-lime">Depoimentos</p>
          <h2 className="title mt-4">Quem usa, recomenda.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map(([name, tag, text], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <figure className={`flex h-full flex-col rounded-[2rem] p-8 ${i === 1 ? "bg-electric" : "bg-royal"}`}>
                <Quote className="text-lime" size={32} />
                <blockquote className="mt-5 flex-1 text-lg">{text}</blockquote>
                <figcaption className="mt-8 border-t border-white/15 pt-5">
                  <span className="block font-display text-lg font-bold">{name}</span>
                  <span className="text-sm text-white/60">{tag}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
