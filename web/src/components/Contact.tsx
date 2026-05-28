"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ArrowUpRight,
  Mail,
  Linkedin,
  MessageCircle,
  Github,
} from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Contact() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Contato",
          headline: "Vamos construir algo bem feito.",
          intro:
            "Conte sobre o projeto — escopo, prazos, referências. Em até 24h você recebe um retorno claro com próximos passos.",
          name: "Nome",
          email: "Email",
          subject: "Empresa / Projeto",
          message: "Sua mensagem",
          send: "Enviar mensagem",
          sending: "Enviando…",
          successTitle: "Mensagem recebida.",
          successMsg:
            "Obrigado pelo contato. Em breve você recebe uma resposta diretamente no seu email.",
          newMessage: "Enviar outra mensagem",
          required: "Nome, email e mensagem são obrigatórios.",
          error: "Erro ao enviar. Tente novamente.",
          info: "Resposta em até 24h",
        }
      : {
          eyebrow: "Contact",
          headline: "Let's build something well-made.",
          intro:
            "Tell me about the project — scope, deadlines, references. Within 24 hours you'll get a clear reply with next steps.",
          name: "Name",
          email: "Email",
          subject: "Company / Project",
          message: "Your message",
          send: "Send message",
          sending: "Sending…",
          successTitle: "Message received.",
          successMsg:
            "Thanks for reaching out. You'll receive a reply in your inbox shortly.",
          newMessage: "Send another message",
          required: "Name, email and message are required.",
          error: "Could not send. Please try again.",
          info: "Reply within 24h",
        };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrorMsg("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg(copy.required);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else {
        setStatus("error");
        setErrorMsg(copy.error);
      }
    } catch {
      setStatus("error");
      setErrorMsg(copy.error);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-40 bg-[color:var(--bg)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(124,147,255,0.10) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <RevealOnScroll>
              <span className="eyebrow">{copy.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                06 / 06
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="mt-8 display text-[clamp(2rem,4vw,3.2rem)]">
                {copy.headline}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-6 text-[15px] leading-[1.8] text-[color:var(--muted)] max-w-md">
                {copy.intro}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="mt-10 space-y-2">
                {[
                  {
                    icon: Mail,
                    href: "mailto:contato@morelidev.com",
                    label: "contato@morelidev.com",
                  },
                  {
                    icon: MessageCircle,
                    href: "https://wa.me/5527999999999",
                    label: "WhatsApp",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/william-moreli",
                    label: "LinkedIn",
                  },
                  {
                    icon: Github,
                    href: "https://github.com/moreliw",
                    label: "GitHub",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center gap-4 py-3 px-4 rounded-xl border border-[color:var(--hairline)] hover:border-[color:var(--hairline-strong)] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <Icon className="size-4 text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors" />
                    <span className="text-sm text-[color:var(--ink)]">
                      {label}
                    </span>
                    <ArrowUpRight className="ml-auto size-4 text-[color:var(--muted-2)] group-hover:text-[color:var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div className="mt-10 flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase text-[color:var(--muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {copy.info}
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll>
              <div className="rounded-2xl glass-strong p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-start py-8"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 16,
                        }}
                        className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 mb-7"
                      >
                        <Check
                          className="size-7 text-emerald-400"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                      <h3 className="font-serif text-3xl text-[color:var(--ink)] mb-3">
                        {copy.successTitle}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[color:var(--muted)] max-w-md mb-8">
                        {copy.successMsg}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            message: "",
                          });
                        }}
                        className="btn-ghost"
                      >
                        {copy.newMessage} →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="block">
                          <span className="field-label">{copy.name} *</span>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            className="field"
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="field-label">{copy.email} *</span>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            className="field"
                            required
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="field-label">{copy.subject}</span>
                        <input
                          type="text"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className="field"
                        />
                      </label>

                      <label className="block">
                        <span className="field-label">{copy.message} *</span>
                        <textarea
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          rows={5}
                          className="field resize-none min-h-[140px]"
                          required
                        />
                      </label>

                      {(errorMsg || status === "error") && (
                        <p className="text-[13px] text-red-400">
                          {errorMsg || copy.error}
                        </p>
                      )}

                      <div className="pt-2">
                        <MagneticButton
                          type="submit"
                          disabled={status === "loading"}
                          className="btn-primary disabled:opacity-60"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {status === "loading" ? (
                              <motion.span
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="inline-flex items-center gap-2"
                              >
                                <span className="size-3 rounded-full border border-current border-t-transparent animate-spin" />
                                {copy.sending}
                              </motion.span>
                            ) : (
                              <motion.span
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="inline-flex items-center gap-2"
                              >
                                {copy.send}
                                <ArrowUpRight className="size-4" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
