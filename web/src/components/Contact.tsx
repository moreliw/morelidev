"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowUpRight,
  Mail,
  Linkedin,
  MessageCircle,
  Github,
} from "lucide-react";

export function Contact() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Contato",
          headline: "Vamos construir algo bem feito.",
          intro:
            "Conte sobre o projeto — escopo, prazos, referências. Em até 24 horas você recebe um retorno claro com próximos passos.",
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
          orReach: "Ou fale diretamente",
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
          orReach: "Or reach out directly",
          required: "Name, email and message are required.",
          error: "Could not send. Please try again.",
          info: "Reply within 24h",
        };

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
    <section id="contact" className="relative py-24 lg:py-36 bg-[color:var(--bg-elevated)]">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left meta */}
          <div className="lg:col-span-5">
            <span className="eyebrow">{copy.eyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              06 / 06
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mt-8 display text-[clamp(2rem,4vw,3.2rem)]"
            >
              {copy.headline}
            </motion.h2>

            <p className="mt-6 text-[15px] leading-[1.8] text-[color:var(--ink-soft)] max-w-md">
              {copy.intro}
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:contato@morelidev.com"
                className="group flex items-center gap-4 py-3 border-b border-[color:var(--hairline)] hover:border-[color:var(--ink)] transition-colors"
              >
                <Mail className="size-4 text-[color:var(--muted)] group-hover:text-[color:var(--ink)] transition-colors" />
                <span className="text-sm text-[color:var(--ink)]">
                  contato@morelidev.com
                </span>
                <ArrowUpRight className="ml-auto size-4 text-[color:var(--muted-2)] group-hover:text-[color:var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
              <a
                href="https://wa.me/5527999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3 border-b border-[color:var(--hairline)] hover:border-[color:var(--ink)] transition-colors"
              >
                <MessageCircle className="size-4 text-[color:var(--muted)] group-hover:text-[color:var(--ink)] transition-colors" />
                <span className="text-sm text-[color:var(--ink)]">WhatsApp</span>
                <ArrowUpRight className="ml-auto size-4 text-[color:var(--muted-2)] group-hover:text-[color:var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
              <a
                href="https://www.linkedin.com/in/william-moreli"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3 border-b border-[color:var(--hairline)] hover:border-[color:var(--ink)] transition-colors"
              >
                <Linkedin className="size-4 text-[color:var(--muted)] group-hover:text-[color:var(--ink)] transition-colors" />
                <span className="text-sm text-[color:var(--ink)]">LinkedIn</span>
                <ArrowUpRight className="ml-auto size-4 text-[color:var(--muted-2)] group-hover:text-[color:var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3 border-b border-[color:var(--hairline)] hover:border-[color:var(--ink)] transition-colors"
              >
                <Github className="size-4 text-[color:var(--muted)] group-hover:text-[color:var(--ink)] transition-colors" />
                <span className="text-sm text-[color:var(--ink)]">GitHub</span>
                <ArrowUpRight className="ml-auto size-4 text-[color:var(--muted-2)] group-hover:text-[color:var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-2.5 text-[12px] tracking-[0.2em] uppercase text-[color:var(--muted)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {copy.info}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:pl-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start py-10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 mb-7"
                  >
                    <motion.span
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Check className="size-7 text-emerald-600" strokeWidth={2.5} />
                    </motion.span>
                  </motion.div>
                  <h3 className="font-serif text-3xl text-[color:var(--ink)] mb-3">
                    {copy.successTitle}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[color:var(--ink-soft)] max-w-md mb-8">
                    {copy.successMsg}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", phone: "", message: "" });
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
                  className="space-y-7"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
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
                    <p className="text-[13px] text-red-600">
                      {errorMsg || copy.error}
                    </p>
                  )}

                  <div className="pt-3">
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
