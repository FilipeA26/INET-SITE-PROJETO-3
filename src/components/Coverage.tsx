import { useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import HangingFibers from "./HangingFibers";
import { waLink } from "../lib";

/** Consulta de cobertura sobre a cortina de fibras penduradas. */
export default function Coverage() {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(waLink(`Olá! Quero saber se a INET atende: ${query}`), "_blank", "noreferrer");
  };

  return (
    <section id="cobertura" className="relative min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#0062EC_0%,#003F99_55%,#03256C_100%)]">
      <HangingFibers className="absolute inset-0 h-full w-full" />
      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-20 pt-40">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="meta text-lime">( F ) Cobertura</p>
            <h2 className="display mt-5 text-5xl sm:text-7xl">
              <span className="block">A luz</span>
              <span className="block pl-[0.8em]">
                <em>já chega</em>
              </span>
              <span className="block">// na sua rua?</span>
            </h2>
          </div>
          <form onSubmit={submit} className="rounded-[2rem] border border-white/20 bg-navy-ink/50 p-6 backdrop-blur-xl sm:p-8">
            <p className="meta text-white/60">Consulte a disponibilidade</p>
            <label className="mt-5 flex items-center gap-3 border-b border-white/30 pb-3">
              <MapPin size={20} className="text-lime" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="CEP, bairro ou cidade"
                aria-label="CEP, bairro ou cidade"
                className="min-w-0 flex-1 bg-transparent font-display text-2xl placeholder:text-white/40 focus:outline-none"
              />
            </label>
            <button type="submit" className="pill-grad mt-6 w-full">
              Consultar no WhatsApp <ArrowUpRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
