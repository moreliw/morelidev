"use client";
import { PropsWithChildren, useRef } from "react";

type Props = PropsWithChildren<{
  className?: string;
  href?: string;
}>;

export function MagneticButton({ className, href, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0, 0)`;
  };

  const base = (
    <a
      ref={ref}
      href={href}
      className={
        "inline-flex h-12 items-center justify-center rounded-full px-6 transition " +
        (className ?? "")
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );

  return base;
}
