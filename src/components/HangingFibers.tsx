import { useEffect, useRef } from "react";

/**
 * Cortina densa de fibras penduradas que balançam e se afastam do mouse
 * (ref. "Hanging Fiber Optics").
 */
export default function HangingFibers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -999, y: -999 };
    const COUNT = window.innerWidth < 768 ? 120 : 260;
    const fibers = Array.from({ length: COUNT }, () => ({
      x: Math.random() * 1.1 - 0.05,
      len: 0.45 + Math.random() * 0.6,
      curl: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.6,
      bright: Math.random(),
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const f of fibers) {
        const x0 = f.x * w, L = f.len * h;
        const sway = Math.sin(t * f.speed + f.phase) * 30;
        let ex = x0 + f.curl * w * 0.4 + sway, ey = L;
        const d = Math.hypot(ex - mouse.x, ey - mouse.y);
        if (d < 200) ex += ((ex - mouse.x) / (d || 1)) * (200 - d) * 0.6;
        const g = ctx.createLinearGradient(x0, 0, ex, ey);
        const a = 0.15 + f.bright * 0.45;
        g.addColorStop(0, "rgba(0,98,236,0.05)");
        g.addColorStop(0.7, `rgba(110,160,255,${a})`);
        g.addColorStop(1, `rgba(220,240,255,${a + 0.2})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = f.bright > 0.85 ? 1.6 : 0.8;
        ctx.beginPath();
        ctx.moveTo(x0, -10);
        ctx.quadraticCurveTo(x0 + sway * 0.3, ey * 0.6, ex, ey);
        ctx.stroke();
        if (f.bright > 0.6) {
          const r = 5 + f.bright * 5;
          const tg = ctx.createRadialGradient(ex, ey, 0, ex, ey, r);
          tg.addColorStop(0, "rgba(255,255,255,0.9)");
          tg.addColorStop(0.4, "rgba(112,224,0,0.45)");
          tg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = tg;
          ctx.fillRect(ex - r, ey - r, r * 2, r * 2);
        }
      }
      ctx.globalCompositeOperation = "source-over";
      if (reduce) cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
