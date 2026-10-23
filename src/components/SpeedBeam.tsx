import { motion } from "framer-motion";

const stats = [
  ["299.792", "km/s", "Velocidade da luz que leva seus dados"],
  ["1", "Giga", "Velocidade máxima na sua casa"],
  ["0", "franquia", "Use à vontade, sem limite de dados"],
];

/** Feixe de luz atravessando a tela com os números ao lado (ref. "Fibre optic networks"). */
export default function SpeedBeam() {
  return (
    <section id="velocidade" className="relative overflow-hidden bg-navy py-32">
      {/* pontos de "luzes da cidade" ao fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(112,224,0,0.25) 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(160,200,255,0.3) 0 1.5px, transparent 3px), radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1.5px)",
          backgroundSize: "180px 140px, 120px 160px, 22px 22px",
        }}
      />
      <div className="container-x relative">
        <p className="meta text-lime">( C ) Velocidade</p>
        <h2 className="display mt-5 max-w-4xl text-5xl sm:text-7xl">
          <span className="block">
            Dados <em>na</em>
          </span>
          <span className="block pl-[0.8em]">velocidade</span>
          <span className="block">
            // <em>da</em> luz
          </span>
        </h2>
      </div>

      {/* o feixe */}
      <div className="relative mt-20 h-24">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "72%" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-electric to-lime"
        >
          <span className="absolute -right-1 top-1/2 h-16 w-40 -translate-y-1/2 rounded-full bg-lime/40 blur-2xl" />
          <span className="absolute -right-1 top-1/2 h-3 w-24 -translate-y-1/2 rounded-full bg-white blur-[3px]" />
          <span className="absolute right-0 top-1/2 h-40 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </motion.div>
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
      </div>

      <div className="container-x relative mt-14 grid gap-10 md:grid-cols-3">
        {stats.map(([n, unit, label], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1 + i * 0.15 }}
            className="border-r border-white/20 pr-6 text-right"
          >
            <p className="font-display text-6xl font-light text-lime">
              {n}
              <span className="ml-2 text-2xl text-[#5CC8FF]">{unit}</span>
            </p>
            <p className="meta mt-3 text-white/60">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
