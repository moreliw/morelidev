import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="MoreliDev — início">
      <strong>MORELI</strong>
      <span className="brand-slash">/</span>
      <span>DEV</span>
    </Link>
  );
}
