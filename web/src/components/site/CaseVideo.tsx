"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import styles from "./ProjectCase.module.css";

type Props = { src: string; poster: string; title: string; pt: boolean };

/** Keep the video and its unoptimized poster off the initial network path. */
export function CaseVideo({ src, poster, title, pt }: Props) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const label = pt
    ? `Reproduzir demonstração de ${title}`
    : `Play the ${title} demonstration`;

  if (playing)
    return (
      <>
        <video
          controls
          autoPlay
          playsInline
          tabIndex={0}
          ref={(node) => {
            node?.focus({ preventScroll: true });
          }}
          onError={() => setFailed(true)}
          aria-label={
            pt
              ? `Demonstração do projeto ${title}`
              : `${title} project demonstration`
          }
        >
          <source src={src} type="video/mp4" />
          <a href={src}>
            {pt ? "Abrir vídeo da demonstração" : "Open demonstration video"}
          </a>
        </video>
        {failed && (
          <p role="alert" className={styles.videoError}>
            {pt
              ? "Não foi possível carregar o vídeo."
              : "The video could not be loaded."}{" "}
            <a href={src}>{pt ? "Abrir demonstração" : "Open demonstration"}</a>
          </p>
        )}
      </>
    );

  return (
    <>
      <button
        type="button"
        className={styles.videoPreview}
        onClick={() => setPlaying(true)}
        aria-label={label}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 90vw"
        />
        <span className={styles.playLabel}>
          <Play size={20} aria-hidden />
          {pt ? "Assistir à demonstração" : "Watch the demonstration"}
        </span>
      </button>
      <noscript>
        <a className={styles.liveLink} href={src}>
          {pt ? "Abrir vídeo da demonstração" : "Open demonstration video"}
        </a>
      </noscript>
    </>
  );
}
