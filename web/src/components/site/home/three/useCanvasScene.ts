"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

type Controller = { setActive: (on: boolean) => void; dispose: () => void };

/**
 * Monta uma cena WebGL sob demanda: o módulo (e o three.js) só é baixado
 * quando o navegador está ocioso ou o canvas se aproxima da viewport, e o
 * loop só roda enquanto o canvas está visível e a aba ativa.
 *
 * `status` vira "fallback" se o WebGL não existir — o componente decide
 * o que mostrar no lugar.
 */
export function useCanvasScene<C extends Controller>(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  load: (canvas: HTMLCanvasElement, reduced: boolean) => Promise<C>,
  opts: { eager?: boolean; rootMargin?: string } = {},
) {
  const ctrl = useRef<C | null>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "fallback">("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let visible = false;
    let started = false;

    const sync = () => ctrl.current?.setActive(visible && !document.hidden);

    const boot = async () => {
      if (started) return;
      started = true;
      try {
        const probe = document.createElement("canvas");
        if (!probe.getContext("webgl2") && !probe.getContext("webgl")) throw new Error("no webgl");
        const c = await load(canvas, reduced);
        if (cancelled) {
          c.dispose();
          return;
        }
        ctrl.current = c;
        setStatus("ready");
        sync();
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) boot();
        sync();
      },
      { rootMargin: opts.rootMargin ?? "200px 0px" },
    );
    io.observe(canvas);

    let idle = 0;
    if (opts.eager) {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle = ric(() => boot(), { timeout: 900 } as IdleRequestOptions) as number;
    }

    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (idle) (window.cancelIdleCallback ?? window.clearTimeout)(idle);
      ctrl.current?.dispose();
      ctrl.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ctrl, status };
}
