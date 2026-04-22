"use client";
import { useState } from "react";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role?: string | null;
  company?: string | null;
  text: string;
  textEn?: string | null;
  order: number;
  active: boolean;
}

export function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function add() {
    setItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        author: "",
        role: "",
        company: "",
        text: "",
        textEn: "",
        order: prev.length + 1,
        active: true,
      },
    ]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  function update(id: string, key: keyof Testimonial, value: string | boolean | number) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, [key]: value } : t)));
  }

  async function save() {
    setSaving(true);
    // We'll use a simple approach: batch upsert via a custom endpoint
    // For simplicity, we POST each one
    await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/40 transition-colors";

  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <div key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-white/40 uppercase tracking-wider">Depoimento #{i + 1}</span>
            <button onClick={() => remove(t.id)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors">
              <Trash2 className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input value={t.author} onChange={(e) => update(t.id, "author", e.target.value)} className={inputClass} placeholder="Autor*" />
            <input value={t.role ?? ""} onChange={(e) => update(t.id, "role", e.target.value)} className={inputClass} placeholder="Cargo" />
            <input value={t.company ?? ""} onChange={(e) => update(t.id, "company", e.target.value)} className={inputClass} placeholder="Empresa" />
          </div>

          <textarea value={t.text} onChange={(e) => update(t.id, "text", e.target.value)} rows={2} className={`${inputClass} resize-none mb-3`} placeholder="Depoimento (PT)*" />
          <textarea value={t.textEn ?? ""} onChange={(e) => update(t.id, "textEn", e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Testimonial (EN)" />
        </div>
      ))}

      <button
        onClick={add}
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white border border-dashed border-white/20 hover:border-white/40 rounded-xl px-5 py-3 w-full justify-center transition-colors"
      >
        <Plus className="size-4" /> Adicionar depoimento
      </button>

      <div className="flex items-center gap-4 pt-2">
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
            <CheckCircle className="size-4" /> Salvo!
          </span>
        )}
      </div>
    </div>
  );
}
