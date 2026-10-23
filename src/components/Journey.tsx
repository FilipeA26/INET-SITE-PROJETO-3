import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Building2, Cable, Router, Smartphone } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  [Building2, "Central INET", "Nossa rede nasce em uma central monitorada 24 horas por dia."],
  [Cable, "Cabos de fibra", "A luz viaja por cabos de fibra óptica pelos postes da sua cidade."],
  [Router, "Até o seu roteador", "A fibra entra na sua casa e chega direto ao roteador Wi-Fi 6."],
  [Smartphone, "Em todos os aparelhos", "Celular, TV, notebook e videogame conectados ao mesmo tempo."],
] as const;

/** "Da central até sua casa": uma fibra se desenha conforme a rolagem. */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section id="jornada" className="bg-electric py-28">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="tag text-lime">Como chega</p>
          <h2 className="title mt-4">Da nossa central até a sua casa, só luz.</h2>
          <p className="mt-6 max-w-md text-lg text-white/80">Sem trechos de cobre no caminho: é por isso que a fibra é mais rápida e mais estável.</p>
        </Reveal>

        <div ref={ref} className="relative pl-14">
          <div className="absolute bottom-2 left-[19px] top-2 w-[3px] rounded-full bg-white/20" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-2 left-[19px] top-2 w-[3px] origin-top rounded-full bg-lime shadow-[0_0_16px_2px_rgba(112,224,0,0.8)]"
          />
          <div className="space-y-16">
            {steps.map(([Icon, title, text], i) => (
              <Reveal key={title} delay={0.05 * i} className="relative">
                <span className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-lime ring-4 ring-electric">
                  <Icon size={18} />
                </span>
                <p className="font-display text-sm font-bold text-lime">0{i + 1}</p>
                <h3 className="mt-1 text-3xl font-bold">{title}</h3>
                <p className="mt-2 max-w-md text-white/80">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
