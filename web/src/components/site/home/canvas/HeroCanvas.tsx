"use client";
import { useEffect, useRef } from "react";

/**
 * Grade técnica discreta — não é decoração aleatória, é o único elemento
 * "de engenharia" do hero. Pontos levemente deslocados por proximidade do
 * cursor; nada gira, nada pisca. Desenhado uma vez e parado quando o
 * usuário pede movimento reduzido, quando a aba está oculta ou quando a
 * seção sai da viewport.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-2")
      .trim() || "#6d8bff";

    let width = 0;
    let height = 0;
    let gap = 46;
    let points: { x: number; y: number; ox: number; oy: number }[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = width < 640 ? 56 : width < 1024 ? 50 : 44;
      points = [];
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap;
          const y = r * gap;
          points.push({ x, y, ox: x, oy: y });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const radius = 150;
      for (const p of points) {
        let x = p.ox;
        let y = p.oy;
        let near = 0;
        if (pointer.active) {
          const dx = p.ox - pointer.x;
          const dy = p.oy - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            near = 1 - dist / radius;
            const push = near * 10;
            x = p.ox + (dx / (dist || 1)) * push;
            y = p.oy + (dy / (dist || 1)) * push;
          }
        }
        p.x += (x - p.x) * 0.16;
        p.y += (y - p.y) * 0.16;
        const size = 1 + near * 1.6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = near > 0.06 ? accent : "rgba(245,244,241,0.16)";
        ctx!.globalAlpha = near > 0.06 ? 0.35 + near * 0.5 : 1;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    build();
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      if (reduced) draw();
    };
    const onLeave = () => {
      pointer.active = false;
      if (reduced) draw();
    };
    const onResize = () => {
      build();
      if (reduced) draw();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!reduced) {
          if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
          if (!entry.isIntersecting && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        }
      },
      { threshold: 0 },
    );
    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!document.hidden && !reduced && !raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    io.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
