import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { ContactForm } from "../ContactForm";

export function CTA({ c }: { c: Copy }) {
  return (
    <section id="contato" className="cta" aria-labelledby="cta-title">
      <div className="container-site cta-grid">
        <div>
          <p className="kicker" data-reveal>
            {c("VAMOS CONVERSAR", "LET'S TALK")}
          </p>
          <h2 id="cta-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {c(
              "Seu próximo projeto pode ser o próximo case.",
              "Your next project could be the next case.",
            )}
          </h2>
          <p className="cta-lead" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Conte onde sua operação precisa chegar. A tecnologia é a parte que construímos juntos.",
              "Tell us where your operation needs to go. Technology is the part we build together.",
            )}
          </p>
          <div className="cta-actions" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#cf-name" className="btn btn-light" data-magnetic>
              {c("Vamos conversar", "Start the conversation")}
              <ArrowRight size={17} aria-hidden />
            </a>
          </div>
          <div className="cta-channels" data-reveal style={{ "--i": 4 } as React.CSSProperties}>
            <a href={`mailto:${LINKS.email}`}>
              <Mail size={17} strokeWidth={1.7} aria-hidden />
              {LINKS.email}
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} strokeWidth={1.7} aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="cta-form" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <h3>{c("Conte sobre o seu projeto", "Tell us about your project")}</h3>
          <p>
            {c(
              "Respondemos em até um dia útil.",
              "We reply within one business day.",
            )}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
