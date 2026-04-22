"use client";
import { useState } from "react";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send, MessageCircle, Linkedin } from "lucide-react";

export function Contact() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Contato",
          intro: "Pronto para levar seu projeto ao próximo nível? Envie um resumo e receba uma proposta objetiva.",
          name: "Seu nome",
          email: "Seu email",
          phone: "Telefone (opcional)",
          message: "Sua mensagem",
          send: "Enviar mensagem",
          sending: "Enviando...",
          successTitle: "Mensagem enviada!",
          successMsg: "Entrarei em contato em breve.",
          newMessage: "Enviar nova mensagem",
          or: "ou fale diretamente",
          required: "Nome, email e mensagem são obrigatórios.",
          error: "Erro ao enviar. Tente novamente.",
        }
      : {
          title: "Contact",
          intro: "Ready to take your project to the next level? Share a brief and get an objective proposal.",
          name: "Your name",
          email: "Your email",
          phone: "Phone (optional)",
          message: "Your message",
          send: "Send message",
          sending: "Sending...",
          successTitle: "Message sent!",
          successMsg: "I'll get back to you soon.",
          newMessage: "Send another message",
          or: "or reach out directly",
          required: "Name, email and message are required.",
          error: "Send error. Please try again.",
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
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(copy.error);
      }
    } catch {
      setStatus("error");
      setErrorMsg(copy.error);
    }
  }

  return (
    <Section id="contact" title={copy.title.toUpperCase()}>
      <p className="text-center text-sm text-[#6b6b6b] leading-relaxed max-w-xl mx-auto mb-10">
        {copy.intro}
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black mb-5"
            >
              <CheckCircle className="size-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-black mb-2">{copy.successTitle}</h3>
            <p className="text-sm text-[#6b6b6b] mb-8">{copy.successMsg}</p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "" }); }}
              className="btn-cta"
            >
              {copy.newMessage}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
                  {copy.name} *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="input-l-shape w-full"
                  placeholder={copy.name}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
                  {copy.email} *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="input-l-shape w-full"
                  placeholder={copy.email}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
                {copy.phone}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="input-l-shape w-full"
                placeholder={copy.phone}
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
                {copy.message} *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="input-l-shape w-full min-h-[130px] resize-none"
                placeholder={copy.message}
                rows={5}
                required
              />
            </div>

            {(errorMsg || status === "error") && (
              <p className="text-red-500 text-xs">{errorMsg || copy.error}</p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cta flex items-center gap-2 disabled:opacity-60"
              >
                <Send className="size-4" />
                {status === "loading" ? copy.sending : copy.send}
              </motion.button>

              <div className="flex items-center gap-4 text-xs text-[#6b6b6b] uppercase tracking-wider">
                <span>{copy.or}</span>
                <a
                  href="https://wa.me/5527999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-black font-bold hover:underline"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/william-moreli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-black font-bold hover:underline"
                >
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </Section>
  );
}
