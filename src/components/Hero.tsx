import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import FiberLines from "./FiberLines";
import FiberTrail from "./FiberTrail";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#03256C_0%,#020F2E_60%,#010818_100%)]">
      <FiberLines className="absolute inset-0 h-full w-full" />
      <FiberTrail className="absolute inset-0 h-full w-full" />

      <div className="container-x pointer-events-none relative z-10 pt-24 text-center">
        <motion.p {...rise(0)} className="tag text-lime">
          Internet 100% fibra óptica · Minas Gerais
        </motion.p>
        <motion.h1 {...rise(0.1)} className="mx-auto mt-6 max-w-5xl font-display text-5xl font-extrabold italic leading-[0.92] sm:text-7xl lg:text-8xl">
          Conectado na velocidade da <span className="text-lime">luz</span>.
        </motion.h1>
        <motion.p {...rise(0.25)} className="mx-auto mt-7 max-w-xl text-lg text-white/70">
          Fibra de ponta a ponta, Wi-Fi 6 e um time local cuidando da sua conexão todos os dias.
        </motion.p>
        <motion.div {...rise(0.4)} className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4">
          <a href="#planos" className="btn-lime">
            Ver planos <ArrowRight size={18} />
          </a>
          <a href="#cobertura" className="btn-line">
            Consultar cobertura
          </a>
        </motion.div>
      </div>

      <a href="#planos" aria-label="Rolar para os planos" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
