import { motion } from "framer-motion";
import NodeIcon from "./NodeIcon";

const groups = [
  {
    n: "01",
    title: "Residencial",
    text: "Internet para a casa inteira, do home office ao streaming 4K.",
    items: ["Fibra até o roteador", "Wi-Fi 6 e mesh", "Streaming e jogos", "Sem franquia"],
  },
  {
    n: "02",
    title: "Empresarial",
    text: "Conexão que não pode parar, com atendimento prioritário.",
    items: ["IP fixo", "Link dedicado", "SLA de atendimento", "Rede para clientes"],
  },
  {
    n: "03",
    title: "Instalação & suporte",
    text: "Equipe própria e local, do agendamento ao pós-venda.",
    items: ["Técnicos próprios", "Suporte 24h", "Atendimento no WhatsApp", "Monitoramento da rede"],
  },
];

/** Serviços numerados (ref. vividmotion "What we do") com ícones de nós (ref. Brand Icons). */
export default function Services() {
  return (
    <section id="servicos" className="bg-lime py-28 text-navy">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 border-b border-navy/20 pb-10 md:flex-row md:items-end">
          <div>
            <p className="meta text-forest">( E ) Serviços</p>
            <h2 className="display mt-5 text-5xl sm:text-7xl">
              <span className="block">O que</span>
              <span className="block pl-[0.8em]">
                <em>a</em> INET faz
              </span>
            </h2>
          </div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.45em] text-navy/70">Conectado. Estável. Confiável.</p>
        </div>

        {groups.map((g, gi) => (
          <motion.div
            key={g.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 border-b border-navy/20 py-12 lg:grid-cols-[1fr_1.4fr]"
          >
            <div className="flex gap-6">
              <span className="font-display text-7xl font-light leading-none text-navy/30 sm:text-8xl">{g.n}</span>
              <div>
                <h3 className="font-display text-3xl font-semibold uppercase sm:text-4xl">{g.title}</h3>
                <p className="mt-2 max-w-sm text-navy/70">{g.text}</p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {g.items.map((item, i) => (
                <li
                  key={item}
                  className="group flex flex-col items-center gap-3 rounded-3xl bg-navy/[0.06] px-3 py-6 text-center transition hover:bg-navy hover:text-lime"
                >
                  <NodeIcon variant={gi * 2 + i} className="h-12 w-12 transition group-hover:rotate-12" />
                  <span className="meta text-[10px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
