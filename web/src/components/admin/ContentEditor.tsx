"use client";
import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";

const SECTIONS = [
  {
    label: "Hero",
    fields: [
      { key: "hero.name", label: "Nome", multiline: false },
      { key: "hero.hi.pt", label: "Saudação (PT)", multiline: false },
      { key: "hero.hi.en", label: "Greeting (EN)", multiline: false },
      { key: "hero.headline.pt", label: "Headline (PT)", multiline: false },
      { key: "hero.headline.en", label: "Headline (EN)", multiline: false },
      { key: "hero.desc.pt", label: "Descrição (PT)", multiline: true },
      { key: "hero.desc.en", label: "Description (EN)", multiline: true },
    ],
  },
  {
    label: "Contato & Redes",
    fields: [
      { key: "contact.email", label: "Email de contato", multiline: false },
      { key: "contact.whatsapp", label: "WhatsApp URL", multiline: false },
      { key: "social.linkedin", label: "LinkedIn URL", multiline: false },
      { key: "social.github", label: "GitHub URL", multiline: false },
    ],
  },
];

export function ContentEditor({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors";
  const labelClass = "block text-xs text-white/40 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-8">
      {SECTIONS.map((section) => (
        <div key={section.label} className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-5">{section.label}</h2>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label className={labelClass}>{field.label}</label>
                {field.multiline ? (
                  <textarea
                    value={values[field.key] ?? ""}
                    onChange={(e) => set(field.key, e.target.value)}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                ) : (
                  <input
                    value={values[field.key] ?? ""}
                    onChange={(e) => set(field.key, e.target.value)}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? "Salvando..." : "Salvar"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm">
            <CheckCircle className="size-4" /> Salvo com sucesso!
          </span>
        )}
      </div>
    </div>
  );
}
