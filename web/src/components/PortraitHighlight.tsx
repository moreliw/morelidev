"use client";
import Image from "next/image";

type Props = {
  src: string;
};

export function PortraitHighlight({ src }: Props) {
  return (
    <div className="relative mx-auto h-[480px] w-[340px] sm:h-[520px] sm:w-[380px] lg:h-[560px] lg:w-[420px] overflow-hidden rounded-2xl border border-white/5 shadow-2xl ring-1 ring-black/10">
      <Image
        src={src}
        alt="Retrato"
        fill
        priority
        sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
        style={{ objectFit: "cover", objectPosition: "65% 42%" }}
        className="transition-transform duration-500 hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
    </div>
  );
}
