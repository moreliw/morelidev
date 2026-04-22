"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";

interface ProjectData {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: string;
  typeEn: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
  order: number;
  published: boolean;
}

interface Props {
  initial?: Partial<ProjectData> & { id?: string };
  mode: "create" | "edit";
}

export function ProjectForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ProjectData>({
    title: initial?.title ?? "",
    titleEn: initial?.titleEn ?? "",
    description: initial?.description ?? "",
    descriptionEn: initial?.descriptionEn ?? "",
    type: initial?.type ?? "",
    typeEn: initial?.typeEn ?? "",
    tags: initial?.tags ?? [],
    imageUrl: initial?.imageUrl ?? "",
    demoUrl: initial?.demoUrl ?? "",
    repoUrl: initial?.repoUrl ?? "",
    order: initial?.order ?? 0,
    published: initial?.published ?? true,
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function field(key: keyof ProjectData, value: string | boolean | number | string[]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !data.tags.includes(t)) {
      field("tags", [...data.tags, t]);
    }
    setTagInput("");
  }

  function removeTag(t: string) {
    field("tags", data.tags.filter((x) => x !== t));
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) field("imageUrl", json.url);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = mode === "edit" ? `/api/projects/${initial?.id}` : "/api/projects";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error ?? "Erro ao salvar");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors";
  const labelClass = "block text-xs text-white/40 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título (PT)</label>
          <input value={data.title} onChange={(e) => field("title", e.target.value)} required className={inputClass} placeholder="Nome do projeto" />
        </div>
        <div>
          <label className={labelClass}>Title (EN)</label>
          <input value={data.titleEn} onChange={(e) => field("titleEn", e.target.value)} className={inputClass} placeholder="Project name" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tipo (PT)</label>
          <input value={data.type} onChange={(e) => field("type", e.target.value)} className={inputClass} placeholder="ex: Sistema de gestão" />
        </div>
        <div>
          <label className={labelClass}>Type (EN)</label>
          <input value={data.typeEn} onChange={(e) => field("typeEn", e.target.value)} className={inputClass} placeholder="ex: Management system" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descrição (PT)</label>
        <textarea value={data.description} onChange={(e) => field("description", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Descrição do projeto..." />
      </div>

      <div>
        <label className={labelClass}>Description (EN)</label>
        <textarea value={data.descriptionEn} onChange={(e) => field("descriptionEn", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Project description..." />
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Tecnologias</label>
        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            className={`${inputClass} flex-1`}
            placeholder="React, Next.js, etc."
          />
          <button type="button" onClick={addTag} className="bg-white/10 hover:bg-white/20 text-white px-3 rounded-lg transition-colors">
            <Plus className="size-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <span key={t} className="flex items-center gap-1 bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
              {t}
              <button type="button" onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors">
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className={labelClass}>Imagem</label>
        <div className="flex gap-3 items-start">
          <label className="flex items-center gap-2 bg-white/5 border border-white/10 border-dashed text-white/60 hover:text-white hover:bg-white/10 rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors">
            <Upload className="size-4" />
            {uploading ? "Enviando..." : "Escolher imagem"}
            <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
          </label>
          {data.imageUrl && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/5">
              <Image src={data.imageUrl} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>
        <input value={data.imageUrl} onChange={(e) => field("imageUrl", e.target.value)} className={`${inputClass} mt-2`} placeholder="Ou cole a URL da imagem" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>URL Demo</label>
          <input value={data.demoUrl} onChange={(e) => field("demoUrl", e.target.value)} className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>URL Repositório</label>
          <input value={data.repoUrl} onChange={(e) => field("repoUrl", e.target.value)} className={inputClass} placeholder="https://github.com/..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ordem</label>
          <input type="number" value={data.order} onChange={(e) => field("order", parseInt(e.target.value))} className={inputClass} />
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => field("published", !data.published)}
              className={`w-10 h-6 rounded-full transition-colors ${data.published ? "bg-green-500" : "bg-white/20"} relative cursor-pointer`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${data.published ? "translate-x-5" : "translate-x-1"}`} />
            </div>
            <span className="text-sm text-white/60">Publicado</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : mode === "edit" ? "Salvar alterações" : "Criar projeto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-white/10 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-white/20 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
