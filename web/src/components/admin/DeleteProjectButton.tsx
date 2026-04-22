"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      onBlur={() => setConfirming(false)}
      className={`p-1.5 rounded-lg transition-colors ${
        confirming
          ? "text-red-400 bg-red-400/10"
          : "text-white/40 hover:text-red-400 hover:bg-white/10"
      }`}
      title={confirming ? "Clique para confirmar" : "Excluir"}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
