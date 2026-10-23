import { useState, type FormEvent } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Orbit from "./Orbit";
import { waLink } from "../lib";

export default function Coverage() {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(waLink(`Olá! Quero saber se a INET atende: ${query}`), "_blank", "noreferrer");
  };

  return (
    <section id="cobertura" className="relative overflow-hidden bg-lime py-28 text-navy">
      <Orbit className="pointer-events-none absolute -right-32 -top-10 w-[720px] opacity-50 mix-blend-multiply" />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="tag text-forest">Cobertura</p>
          <h2 className="title mt-4">A fibra da INET chega na sua rua?</h2>
          <p className="mt-5 max-w-lg text-lg text-navy/75">Digite seu CEP ou bairro e fale direto com a nossa equipe para confirmar.</p>
          <form onSubmit={submit} className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-full bg-navy px-6 py-4 text-white">
              <MapPin size={20} className="text-lime" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="CEP, bairro ou cidade"
                aria-label="CEP, bairro ou cidade"
                className="min-w-0 flex-1 bg-transparent placeholder:text-white/50 focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-navy border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white">
              Consultar <ArrowRight size={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
