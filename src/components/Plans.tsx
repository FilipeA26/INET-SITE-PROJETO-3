import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import MeshCanvas from "./MeshCanvas";
import { PHONE, waLink } from "../lib";

// Valores provisórios — trocar pelos planos reais da INET
const catalog = {
  Residencial: [
    { speed: "400", unit: "Mega", price: "89,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia"] },
    { speed: "700", unit: "Mega", price: "109,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia", "Suporte prioritário"], featured: true },
    { speed: "1", unit: "Giga", price: "149,90", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia", "Suporte VIP"] },
  ],
  Empresarial: [
    { speed: "500", unit: "Mega", price: "149,90", perks: ["IP fixo", "SLA de atendimento", "Wi-Fi 6"] },
    { speed: "800", unit: "Mega", price: "199,90", perks: ["IP fixo", "SLA prioritário", "Wi-Fi 6 mesh", "Link redundante"], featured: true },
    { speed: "1", unit: "Giga", price: "299,90", perks: ["IP fixo", "SLA 4h", "Link dedicado", "Gerente de conta"] },
  ],
};
type Kind = keyof typeof catalog;

/** Planos dentro de um painel com malha 3D (ref. Broadband ISP hero). */
export default function Plans() {
  const [kind, setKind] = useState<Kind>("Residencial");

  return (
    <section id="planos" className="bg-royal px-3 py-24 sm:px-6">
      <div className="mx-auto max-w-[1500px] rounded-[2.75rem] bg-white/15 p-2 shadow-2xl shadow-black/30">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(120deg,#020F2E_0%,#03256C_45%,#0062EC_80%,#38B000_120%)]">
          <MeshCanvas className="absolute inset-0 h-full w-full [filter:blur(1.4px)_saturate(1.2)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-ink/60 via-transparent to-navy-ink/70" />

          <div className="relative px-5 pb-16 pt-8 sm:px-10">
            {/* barra superior estilo do hero de referência */}
            <div className="flex items-center justify-between gap-4">
              <span className="meta text-white/70">( D ) Planos</span>
              <div className="hidden rounded-full bg-white/10 p-1 backdrop-blur-md sm:flex" role="tablist">
                {(Object.keys(catalog) as Kind[]).map((k) => (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={kind === k}
                    onClick={() => setKind(k)}
                    className={`rounded-full px-5 py-2 text-sm transition ${kind === k ? "bg-white/90 font-semibold text-navy" : "text-white/80 hover:text-white"}`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <a href="tel:+553335363939" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy">
                <Phone size={14} /> {PHONE}
              </a>
            </div>

            <div className="mx-auto mt-20 max-w-4xl text-center">
              <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">
                <span className="grad-text">Internet ultrarrápida</span> que você confia todo dia
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-white/80">
                Planos 100% fibra para casa e empresa, com Wi-Fi 6, instalação grátis e sem franquia de dados.
              </p>
              <div className="mt-6 flex justify-center sm:hidden">
                <div className="flex rounded-full bg-white/10 p-1 backdrop-blur-md">
                  {(Object.keys(catalog) as Kind[]).map((k) => (
                    <button key={k} onClick={() => setKind(k)} className={`rounded-full px-4 py-2 text-sm ${kind === k ? "bg-white/90 font-semibold text-navy" : "text-white/80"}`}>
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={kind}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3"
              >
                {catalog[kind].map((p) => (
                  <article
                    key={p.speed + p.unit}
                    className={`flex flex-col rounded-[2rem] border p-7 backdrop-blur-xl transition hover:-translate-y-1 ${
                      p.featured ? "border-lime/70 bg-navy-ink/60 shadow-[0_0_60px_-15px_rgba(112,224,0,0.7)]" : "border-white/20 bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="meta text-white/60">{kind}</span>
                      {p.featured && <span className="meta rounded-full bg-lime px-2.5 py-1 text-[9px] text-navy">Mais escolhido</span>}
                    </div>
                    <p className="mt-6 font-display text-7xl font-light leading-none">
                      {p.speed}
                      <span className="ml-1 text-2xl font-medium italic text-lime">{p.unit}</span>
                    </p>
                    <p className="mt-6 font-display text-3xl font-semibold">
                      R$ {p.price}
                      <span className="text-sm font-normal text-white/60">/mês</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5 text-sm text-white/85">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5">
                          <Check size={15} className="text-lime" /> {perk}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(`Olá! Quero o plano ${kind.toLowerCase()} de ${p.speed} ${p.unit} da INET.`)}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-8 ${p.featured ? "pill-grad" : "pill-glass"}`}
                    >
                      Assinar <ArrowUpRight size={16} />
                    </a>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
