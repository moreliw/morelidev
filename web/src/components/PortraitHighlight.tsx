"use client";
import Image from "next/image";

type Props = {
  src: string;
};

export function PortraitHighlight({ src }: Props) {
  return (
    <div className="relative mx-auto h-[520px] w-[380px] sm:h-[560px] sm:w-[420px] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-2xl">
      <Image
        src={src}
        alt="Retrato"
        fill
        priority
        sizes="(max-width: 640px) 380px, 420px"
        style={{ objectFit: "cover", objectPosition: "65% 42%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

