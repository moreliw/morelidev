"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { language } = useLanguage();
  const f = COPY.contact.form;

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    // honeypot anti-spam: humanos nunca preenchem este campo
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  function set(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = t(f.errRequired, language);
    if (!form.email.trim()) errors.email = t(f.errRequired, language);
    else if (!EMAIL_RE.test(form.email)) errors.email = t(f.errEmail, language);
    if (!form.message.trim()) errors.message = t(f.errRequired, language);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return; // bot detectado — descarta silenciosamente
    if (!validate()) return;
    setStatus("loading");
    try {
      const message = form.company
        ? `[${language === "pt" ? "Empresa" : "Company"}: ${form.company}]\n\n${form.message}`
        : form.message;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message,
        }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("success");
      requestAnimationFrame(() => {
        successRef.current?.focus();
        const check = successRef.current?.querySelector("path");
        if (
          check &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          // microinteração de confirmação (anime.js): traço do check
          import("animejs").then(({ animate, svg }) => {
            animate(svg.createDrawable(check), {
              draw: "0 1",
              duration: 600,
              ease: "outQuad",
            });
          });
        }
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="card p-8 flex flex-col items-start"
      >
        <span
          aria-hidden
          className="inline-flex items-center justify-center size-12 rounded-full border border-[color:var(--ok)]/40 bg-[color:var(--ok)]/10 mb-5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12.5 9.5 18 20 6.5"
              stroke="var(--ok)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-[1.15rem] font-semibold text-[color:var(--ink)]">
          {t(f.successTitle, language)}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-[color:var(--muted)]">
          {t(f.successMsg, language)}
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-6 !min-h-10 !py-2 text-[0.85rem]"
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", company: "", phone: "", message: "", website: "" });
          }}
        >
          {t(f.again, language)}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="field-label">
            {t(f.name, language)} *
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="field"
            aria-invalid={fieldErrors.name ? "true" : undefined}
            aria-describedby={fieldErrors.name ? "cf-name-err" : undefined}
            required
          />
          {fieldErrors.name && (
            <p id="cf-name-err" className="field-error">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">
            {t(f.email, language)} *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field"
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "cf-email-err" : undefined}
            required
          />
          {fieldErrors.email && (
            <p id="cf-email-err" className="field-error">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-company" className="field-label">
            {t(f.company, language)}
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">
            {t(f.phone, language)}
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="field-label">
          {t(f.message, language)} *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="field resize-none"
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={fieldErrors.message ? "cf-message-err" : undefined}
          required
        />
        {fieldErrors.message && (
          <p id="cf-message-err" className="field-error">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* honeypot — invisível para pessoas, preenchido por bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="field-error">{t(f.errServer, language)}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-[0.78rem] text-[color:var(--muted-2)] max-w-[28ch] sm:max-w-none">
          {t(f.privacy, language)}
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary disabled:opacity-60"
        >
          {status === "loading" ? t(f.sending, language) : t(f.send, language)}
        </button>
      </div>
    </form>
  );
}
