import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="min-h-svh flex flex-col items-center justify-center text-center px-6"
    >
      <p className="text-[0.85rem] font-semibold tracking-[0.16em] uppercase text-[color:var(--accent-ink)]">
        404
      </p>
      <h1 className="display mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-[color:var(--ink)]">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
        O endereço que você acessou não existe ou foi movido. / The page you
        visited doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Ir para o início
      </Link>
    </main>
  );
}
