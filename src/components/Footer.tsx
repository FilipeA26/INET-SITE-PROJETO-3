import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import Orbit from "./Orbit";
import { PHONE, waLink } from "../lib";

/** Fechamento + rodapé (ref. vividmotion "Have a project in mind?"). */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink">
      <Orbit className="pointer-events-none absolute -right-40 top-10 w-[900px] opacity-25" />
      <div className="container-x relative py-28">
        <p className="meta text-lime">( G ) Vamos conectar</p>
        <h2 className="display mt-6 text-[12vw] sm:text-8xl lg:text-[8.5rem]">
          <span className="block">
            Pronto <em>para</em>
          </span>
          <span className="block pl-[0.6em]">ligar a luz?</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={waLink("Olá! Quero contratar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="pill-grad">
            Assinar pelo WhatsApp <ArrowUpRight size={18} />
          </a>
          <a href="tel:+553335363939" className="pill-glass">
            Ligar {PHONE}
          </a>
        </div>
      </div>

      <div className="container-x relative grid gap-10 border-t border-white/10 py-12 text-sm md:grid-cols-4">
        <div>
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-10 w-auto" />
          <p className="meta mt-4 text-white/40">Internet Fibra Óptica</p>
        </div>
        <div>
          <p className="meta text-white/40">Contato</p>
          <p className="mt-3 text-white/80">{PHONE}</p>
          <p className="text-white/80">inetminas.com.br</p>
        </div>
        <div>
          <p className="meta text-white/40">Redes</p>
          <div className="mt-3 flex gap-3">
            <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-lime hover:text-lime"><Instagram size={17} /></a>
            <a href="https://facebook.com/inetminas" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-lime hover:text-lime"><Facebook size={17} /></a>
          </div>
          <p className="mt-2 text-white/80">@inetminas</p>
        </div>
        <div className="md:text-right">
          <p className="meta text-white/40">Navegue</p>
          {[["Planos", "#planos"], ["Serviços", "#servicos"], ["Cobertura", "#cobertura"]].map(([l, h]) => (
            <a key={h} href={h} className="mt-2 block text-white/80 hover:text-lime">{l} ↗</a>
          ))}
        </div>
      </div>
      <div className="container-x flex justify-between border-t border-white/10 py-6">
        <span className="meta text-white/30">© {new Date().getFullYear()} INET</span>
        <span className="meta text-white/30">[ Minas Gerais · Brasil ]</span>
      </div>
    </footer>
  );
}
