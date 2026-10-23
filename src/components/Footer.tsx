import { Instagram, Facebook, Phone, MessageCircle } from "lucide-react";
import { PHONE, waLink } from "../lib";

export default function Footer() {
  return (
    <footer className="bg-navy-ink">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-sm text-white/60">Internet Fibra Óptica. Velocidade, estabilidade e atendimento local em Minas Gerais.</p>
        </div>
        <div>
          <p className="tag text-lime">Navegue</p>
          <ul className="mt-5 space-y-2 text-sm text-white/75">
            {[["Planos", "#planos"], ["Como chega", "#jornada"], ["Vantagens", "#vantagens"], ["Cobertura", "#cobertura"]].map(([l, h]) => (
              <li key={h}><a href={h} className="hover:text-lime">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="tag text-lime">Contato</p>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li><a href="tel:+553335363939" className="inline-flex items-center gap-2 hover:text-lime"><Phone size={16} /> {PHONE}</a></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-lime"><MessageCircle size={16} /> WhatsApp</a></li>
            <li>inetminas.com.br</li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime hover:text-navy"><Instagram size={18} /></a>
            <a href="https://facebook.com/inetminas" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime hover:text-navy"><Facebook size={18} /></a>
            <span className="text-sm font-semibold">@inetminas</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} INET – Internet Fibra Óptica</div>
    </footer>
  );
}
