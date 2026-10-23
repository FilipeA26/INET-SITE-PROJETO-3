import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const text =
  "Levamos luz por fios de vidro até a sua casa, para que tudo o que importa chegue no mesmo instante: o trabalho, a aula, o jogo, a chamada com quem está longe.";

/** Frase-manifesto que acende palavra por palavra com a rolagem (ref. vividmotion). */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const words = text.split(" ");

  return (
    <section ref={ref} className="bg-navy-ink py-32 sm:py-44">
      <div className="container-x grid gap-10 lg:grid-cols-[200px_1fr]">
        <p className="meta text-lime">( B ) Manifesto</p>
        <p className="font-display text-3xl font-light leading-[1.2] sm:text-5xl lg:text-6xl">
          {words.map((w, i) => (
            <Word key={i} p={scrollYProgress} at={i / words.length} highlight={["luz", "vidro", "instante:"].includes(w)}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ p, at, highlight, children }: { p: MotionValue<number>; at: number; highlight: boolean; children: string }) {
  const opacity = useTransform(p, [at - 0.08, at], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? "italic text-lime" : ""}`}>
      {children}
    </motion.span>
  );
}
