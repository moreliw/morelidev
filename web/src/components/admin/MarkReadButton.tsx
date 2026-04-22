"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCheck, Mail } from "lucide-react";

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !read }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={read ? "Marcar como não lida" : "Marcar como lida"}
      className="shrink-0 p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
    >
      {read ? <Mail className="size-4" /> : <CheckCheck className="size-4" />}
    </button>
  );
}
