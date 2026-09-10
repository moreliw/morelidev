import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="MoreliDev — início">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-horizontal-dark.svg" alt="" className="brand-logo brand-logo--dark" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-horizontal-light.svg" alt="" className="brand-logo brand-logo--light" />
    </Link>
  );
}
