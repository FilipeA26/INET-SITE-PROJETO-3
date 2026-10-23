import { useEffect, useRef } from "react";

/**
 * Linhas de fibra horizontais que se curvam para longe do cursor,
 * com pulsos de luz viajando por elas.
 */
export default function FiberLines({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };

    const LINES = window.innerWidth < 768 ? 16 : 28;
    const lines = Array.from({ length: LINES }, (_, i) => ({
      base: (i + 0.5) / LINES,
      amp: 6 + Math.random() * 14,
      freq: 1 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
    }));
    const pulses = Array.from({ length: LINES * 2 }, () => ({
      line: Math.floor(Math.random() * LINES),
      x: Math.random(),
      v: 0.0015 + Math.random() * 0.004,
      lime: Math.random() < 0.6,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const RADIUS = 170;
    // altura da linha no ponto x, já com a curva desviando do cursor
    const yAt = (l: (typeof lines)[number], x: number, t: number) => {
      let y = l.base * h + Math.sin((x / w) * Math.PI * l.freq + t * l.speed + l.phase) * l.amp;
      const dx = x - mouse.sx, dy = y - mouse.sy;
      const d = Math.hypot(dx, dy);
      if (d < RADIUS) {
        const push = (1 - d / RADIUS) ** 2 * 70;
        y += (dy >= 0 ? 1 : -1) * push;
      }
      return y;
    };

    const frame = (now: number) => {
      const t = now / 1000;
      mouse.sx += (mouse.x - mouse.sx) * 0.12;
      mouse.sy += (mouse.y - mouse.sy) * 0.12;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const l of lines) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "rgba(0,98,236,0)");
        grad.addColorStop(0.3, "rgba(0,98,236,0.35)");
        grad.addColorStop(0.75, "rgba(56,176,0,0.35)");
        grad.addColorStop(1, "rgba(112,224,0,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 14) {
          const y = yAt(l, x, t);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (const p of pulses) {
        p.x += p.v;
        if (p.x > 1.05) {
          p.x = -0.05;
          p.line = Math.floor(Math.random() * LINES);
        }
        const x = p.x * w;
        const y = yAt(lines[p.line], x, t);
        const near = Math.max(0, 1 - Math.hypot(x - mouse.sx, y - mouse.sy) / 260);
        const r = 14 + near * 22;
        // cauda do pulso
        const tail = ctx.createLinearGradient(x - 120, y, x, y);
        const c = p.lime ? "112,224,0" : "80,160,255";
        tail.addColorStop(0, `rgba(${c},0)`);
        tail.addColorStop(1, `rgba(${c},${0.55 + near * 0.4})`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let k = 120; k >= 0; k -= 10) ctx.lineTo(x - k, yAt(lines[p.line], x - k, t));
        ctx.stroke();
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(0.25, `rgba(${c},0.6)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
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
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
