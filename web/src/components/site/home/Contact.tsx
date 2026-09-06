import type { Copy } from "./types";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { LINKS } from "@/content/site";
import { ContactForm } from "../ContactForm";

export function Contact({ c }: { c: Copy }) {
  return (
    <section
      id="contato"
      className="contact-section section-space"
      aria-labelledby="contact-title"
    >
      <div className="container-site contact-grid">
        <div className="contact-copy">
          <p className="kicker">
            {c("VAMOS CONSTRUIR ALGO GRANDE?", "LET’S BUILD SOMETHING GREAT")}
          </p>
          <h2 id="contact-title" className="editorial-title">
            {c("Seu próximo projeto", "Your next project")}
            <br />
            {c("pode ser o", "could be our")}{" "}
            <em>{c("próximo case.", "next success story.")}</em>
          </h2>
          <p>
            {c(
              "Conte o que você tem em mente. Vamos descobrir juntos como a tecnologia pode levar seu negócio mais longe.",
              "Tell us what you have in mind. Let’s discover how technology can take your business further.",
            )}
          </p>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            <MessageCircle size={18} aria-hidden />
            {c("Conversar pelo WhatsApp", "Let’s talk on WhatsApp")}
            <ArrowUpRight size={17} aria-hidden />
          </a>
          <a className="contact-email" href={`mailto:${LINKS.email}`}>
            {LINKS.email}
            <ArrowUpRight size={15} aria-hidden />
          </a>
          <p className="contact-note">
            <ShieldCheck size={17} aria-hidden />
            {c(
              "Uma conversa, possibilidades reais.",
              "One conversation, real possibilities.",
            )}
          </p>
        </div>
        <div className="contact-form-panel">
          <p className="form-heading">
            {c(
              "Vamos conhecer seu projeto.",
              "Let’s get to know your project.",
            )}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
