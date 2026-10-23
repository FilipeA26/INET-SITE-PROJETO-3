import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { waLink } from "../lib";

const links = [
  ["Planos", "#planos"],
  ["Serviços", "#servicos"],
  ["Velocidade", "#velocidade"],
  ["Cobertura", "#cobertura"],
];

/** Relógio ao vivo no horário de Brasília (ref. vividmotion). */
function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * No hero: logo + relógio à esquerda e menu vertical à direita (ref. Fiber Optic Eye).
 * Depois do hero: barra compacta horizontal com fundo, para ler sobre as seções coloridas.
 */
export default function Header() {
  const time = useClock();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // o hero é longo (animação presa na tela), então só compacta quando ele termina
    const on = () => {
      const hero = document.getElementById("inicio");
      const end = hero ? hero.offsetHeight - window.innerHeight : window.innerHeight;
      setCompact(window.scrollY > end);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${compact || open ? "bg-navy-ink/80 backdrop-blur-xl" : ""}`}>
      <div className={`container-x flex justify-between transition-all duration-500 ${compact ? "items-center py-3" : "items-start py-5"}`}>
        <div className="flex items-center gap-5">
          <a href="#inicio" aria-label="INET – início">
            <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className={`w-auto transition-all ${compact ? "h-7" : "h-9"}`} />
          </a>
          {compact && <span className="meta hidden text-white/45 sm:inline">[ MG · {time} BRT ]</span>}
        </div>
        {!compact && <p className="meta absolute left-5 top-[4.1rem] text-white/45 sm:left-8 lg:left-12">[ MG · {time} BRT ]</p>}

        <nav className={`hidden text-right md:flex ${compact ? "flex-row items-center gap-7" : "flex-col items-end gap-1"}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="meta group inline-flex items-center gap-1 text-white/75 transition hover:text-lime">
              {label}
              <ArrowUpRight size={12} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className={compact ? "pill-outline border-lime py-2 text-lime" : "meta mt-1 inline-flex items-center gap-1 text-lime"}
          >
            Fale conosco <ArrowUpRight size={12} />
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-6 pt-4 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="display text-3xl">
              {label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="pill-outline mt-2 w-fit">
            Fale conosco <ArrowUpRight size={14} />
          </a>
        </nav>
      )}
    </header>
  );
}
