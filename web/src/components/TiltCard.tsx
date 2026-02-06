"use client";
import { PropsWithChildren, useRef } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export function TiltCard({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -(y / rect.height - 0.5) * 6;
    const ry = (x / rect.width - 0.5) * 6;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={ref}
      className={
        "rounded-xl border will-change-transform transition-transform duration-200 " +
        (className ?? "")
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

