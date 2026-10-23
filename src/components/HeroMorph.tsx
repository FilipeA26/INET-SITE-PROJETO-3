import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FiberTrail from "./FiberTrail";
import { waLink } from "../lib";

/**
 * Hero inspirado no "Fiber Optic Eye": um feixe 3D de fibras com pontas
 * luminosas que, conforme a rolagem, se torce numa fita e termina como uma
 * íris de fibras com anel de raios. As fibras reagem ao mouse.
 */
const N = 110; // fibras
const K = 22; // pontos por fibra
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

export default function HeroMorph() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const strands = Array.from({ length: N }, (_, i) => ({
      u: i / N,
      z: 0.25 + Math.random() ** 0.8 * 0.75,
      // feixe (layout A)
      sx: 0.36 + Math.random() * 0.3,
      tipX: 0.64 + gauss() * 0.16,
      tipY: 0.5 + gauss() * 0.24,
      bend: 0.1 + Math.random() * 0.15,
      len: 0.72 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
    })).sort((a, b) => a.z - b.z);
    const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.3, v: 0.02 + Math.random() * 0.05 }));
    const pts = new Float32Array(K * 2);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    const frame = (now: number) => {
      const t = now / 1000;
      const p = scrollYProgress.get();
      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;
      const toRibbon = smooth((p - 0.22) / 0.28);
      const toIris = smooth((p - 0.52) / 0.28);
      const m = Math.min(w, h);
      const cx = w * 0.5, cy = h * 0.5;
      const r0 = m * 0.075, r1 = m * 0.22;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // poeira de luz
      for (const d of dust) {
        d.y -= d.v / 100;
        if (d.y < -0.02) d.y = 1.02;
        ctx.fillStyle = `rgba(120,170,255,${0.25 * (1 - toIris * 0.6)})`;
        ctx.beginPath();
        ctx.arc(d.x * w + mouse.sx * 30, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of strands) {
        // cada fibra muda de forma num tempo levemente diferente (morph orgânico)
        const a = clamp01(toRibbon * 1.35 - s.u * 0.35);
        const b = clamp01(toIris * 1.35 - s.u * 0.35);
        const sway = Math.sin(t * 0.7 + s.phase) * 10 * s.z;
        const px = mouse.sx * 60 * s.z, py = mouse.sy * 40 * s.z;

        for (let k = 0; k < K; k++) {
          const q = k / (K - 1);
          // A — feixe descendo do alto à direita até as pontas
          const sx = s.sx * w, sy = -h * 0.12;
          const tx = s.tipX * w + px + sway, ty = s.tipY * h + py;
          const ccx = (sx + tx) / 2 - s.bend * w, ccy = h * 0.25;
          const qa = q * s.len;
          const ua = 1 - qa;
          const ax = ua * ua * sx + 2 * ua * qa * ccx + qa * qa * tx;
          const ay = ua * ua * sy + 2 * ua * qa * ccy + qa * qa * ty;
          // B — fita torcida subindo
          const by = h * 1.12 - q * h * 0.95 * s.len;
          const twist = Math.cos(q * 2.6 + t * 0.6 + s.u * 0.8);
          const bx = w * 0.56 + Math.sin(q * 3 + t * 0.7) * w * 0.07 + (s.u - 0.5) * w * 0.16 * twist + px;
          // C — íris radial
          const ang = s.u * Math.PI * 2 + t * 0.15 + q * 0.35;
          const rr = r0 + q * (r1 - r0) * (0.75 + s.len * 0.25);
          const ix = cx + Math.cos(ang) * rr + px * 0.3;
          const iy = cy + Math.sin(ang) * rr + py * 0.3;
          const x1 = ax + (bx - ax) * a, y1 = ay + (by - ay) * a;
          pts[k * 2] = x1 + (ix - x1) * b;
          pts[k * 2 + 1] = y1 + (iy - y1) * b;
        }

        const far = s.z < 0.45;
        const x0 = pts[0], y0 = pts[1], xe = pts[(K - 1) * 2], ye = pts[(K - 1) * 2 + 1];
        const g = ctx.createLinearGradient(x0, y0, xe, ye);
        const alpha = (far ? 0.1 : 0.22 + s.z * 0.3) * (1 + b * 0.5);
        g.addColorStop(0, b > 0.5 ? `rgba(112,224,0,${alpha})` : "rgba(0,98,236,0)");
        g.addColorStop(0.5, `rgba(0,98,236,${alpha * 0.8})`);
        g.addColorStop(1, `rgba(120,175,255,${alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = far ? 6 + (0.45 - s.z) * 18 : 0.8 + s.z * 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        for (let k = 1; k < K; k++) ctx.lineTo(pts[k * 2], pts[k * 2 + 1]);
        ctx.stroke();

        // ponta luminosa (bokeh)
        // ponta: disco nítido (fibra próxima) ou bokeh desfocado (fibra distante)
        const tr = (far ? 12 : 3 + s.z * 6) * (1 - b * 0.5);
        const tg = ctx.createRadialGradient(xe, ye, 0, xe, ye, tr * 1.8);
        tg.addColorStop(0, `rgba(205,235,255,${far ? 0.12 : 0.55})`);
        tg.addColorStop(far ? 0.2 : 0.5, `rgba(120,190,255,${far ? 0.08 : 0.35})`);
        tg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = tg;
        ctx.fillRect(xe - tr * 1.8, ye - tr * 1.8, tr * 3.6, tr * 3.6);
      }

      // anel de raios brancos da íris
      if (toIris > 0.01) {
        const ringR = r1 * 1.22;
        ctx.save();
        ctx.globalAlpha = toIris;
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.shadowColor = "rgba(180,220,255,0.9)";
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();
        const spokes = 40, rot = t * 0.05;
        for (let i = 0; i < spokes; i++) {
          const an = (i / spokes) * Math.PI * 2 + rot;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(an) * r1 * 1.02, cy + Math.sin(an) * r1 * 1.02);
          ctx.quadraticCurveTo(
            cx + Math.cos(an + 0.04) * r1 * 1.12,
            cy + Math.sin(an + 0.04) * r1 * 1.12,
            cx + Math.cos(an) * ringR,
            cy + Math.sin(an) * ringR,
          );
          ctx.stroke();
        }
        ctx.restore();
        // pupila
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(1,8,24,${toIris})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r0 * 0.92, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [scrollYProgress]);

  const p = scrollYProgress;
  return (
    <section ref={sectionRef} id="inicio" className="relative h-[320vh] bg-navy-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_65%_40%,#03256C_0%,#020F2E_45%,#010818_80%)]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <FiberTrail className="absolute inset-0 h-full w-full" />

        {/* fase 1 — título editorial */}
        <Fade p={p} range={[0, 0, 0.14, 0.24]} className="absolute bottom-[12%] left-5 sm:left-12 lg:left-16">
          <h1 className="display text-[12vw] sm:text-6xl lg:text-[5.2rem]">
            <span className="block">Internet</span>
            <span className="block pl-[0.6em]">
              <em>de</em> verdade
            </span>
            <span className="block">
              // <em>é</em> fibra
            </span>
            <span className="block pl-[1.1em] text-lime">
              <em>de</em> ponta <em>a</em> ponta
            </span>
          </h1>
        </Fade>
        <Fade p={p} range={[0, 0, 0.14, 0.24]} className="absolute bottom-[12%] right-5 hidden w-72 sm:right-12 md:block lg:right-16">
          <div className="flex items-center justify-between">
            <span className="meta">( A )</span>
            <span className="meta text-white/50">[ 100% fibra ]</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            A INET leva luz por fios de vidro até a sua casa. Ultravelocidade, Wi-Fi 6 e um time local cuidando de cada conexão.
          </p>
          <a href={waLink("Olá! Quero assinar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="pill-outline mt-6 w-full">
            Assine hoje <ArrowUpRight size={14} />
          </a>
        </Fade>

        {/* fase 2 — fita */}
        <Fade p={p} range={[0.3, 0.38, 0.48, 0.55]} className="absolute left-5 top-[22%] sm:left-12 lg:left-16">
          <p className="meta text-lime">[ 02 / 03 ]</p>
          <h2 className="display mt-4 text-5xl sm:text-7xl">
            <span className="block">Milhares</span>
            <span className="block pl-[0.6em]">
              <em>de</em> fios
            </span>
            <span className="block">
              // <em>de</em> luz
            </span>
          </h2>
        </Fade>
        <Fade p={p} range={[0.3, 0.38, 0.48, 0.55]} className="absolute right-5 top-[22%] hidden w-64 text-sm text-white/70 sm:right-12 md:block lg:right-16">
          Cada fio de fibra é mais fino que um cabelo e transmite dados como pulsos de luz, sem interferência e sem perda no caminho.
        </Fade>

        {/* fase 3 — íris */}
        <Fade p={p} range={[0.72, 0.82, 1, 1]} className="absolute bottom-[10%] left-5 sm:left-12 lg:left-16">
          <p className="display text-4xl sm:text-6xl">
            Enxergue <em>a</em> velocidade
          </p>
        </Fade>
        <Fade p={p} range={[0.72, 0.82, 1, 1]} className="absolute bottom-[10%] right-5 sm:right-12 lg:right-16">
          <img src="/inet-logo-branca.png" alt="INET" className="h-12 w-auto sm:h-16" />
        </Fade>

        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex justify-between sm:left-12 sm:right-12 lg:left-16 lg:right-16">
          <span className="meta text-white/40">Role para explorar ↓</span>
          <ScrollCounter p={p} />
        </div>
      </div>
    </section>
  );
}

// aparece entre range[0]→range[1] e some entre range[2]→range[3];
// faixas que começam em 0 ou terminam em 1 ficam visíveis nessa ponta
function Fade({ p, range, className, children }: { p: MotionValue<number>; range: number[]; className: string; children: ReactNode }) {
  const [a, b, c, d] = range;
  const startsVisible = a === b;
  const endsVisible = c === d;
  const input = [startsVisible ? -1 : a, b, endsVisible ? 2 : c, endsVisible ? 3 : d];
  const opacity = useTransform(p, input, [startsVisible ? 1 : 0, 1, 1, endsVisible ? 1 : 0]);
  const y = useTransform(p, input, [startsVisible ? 0 : 40, 0, 0, endsVisible ? 0 : -40]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function ScrollCounter({ p }: { p: MotionValue<number> }) {
  const label = useTransform(p, (v) => `[ 0${v < 0.3 ? 1 : v < 0.62 ? 2 : 3} / 03 ]`);
  return <motion.span className="meta text-white/40">{label}</motion.span>;
}
