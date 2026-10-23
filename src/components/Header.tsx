import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { waLink } from "../lib";

const links = [
  ["Planos", "#planos"],
  ["Como chega", "#jornada"],
  ["Vantagens", "#vantagens"],
  ["Cobertura", "#cobertura"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`container-x flex h-16 items-center justify-between rounded-full transition-all duration-300 ${
          scrolled || open ? "bg-navy/90 shadow-lg shadow-black/20 backdrop-blur-xl" : ""
        }`}
      >
        <a href="#inicio" aria-label="INET – início">
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-white/80 transition hover:text-lime">
              {label}
            </a>
          ))}
        </nav>
        <a href={waLink("Olá! Quero assinar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-lime hidden py-2.5 text-sm lg:inline-flex">
          Assine já
        </a>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-x mt-2 flex flex-col gap-1 rounded-3xl bg-navy p-4 lg:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 hover:bg-white/10">
              {label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-lime mt-2">
            Assine já
          </a>
        </nav>
      )}
    </header>
  );
}
