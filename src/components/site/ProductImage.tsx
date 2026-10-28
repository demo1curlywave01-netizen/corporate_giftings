import { useState } from "react";

/** Shows /images/products/<code>.jpg; falls back to a gold-bordered placeholder with logo watermark. */
export function ProductImage({
  src, code, alt, className = "", eager = false,
}: { src?: string | undefined; code: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-secondary ${className}`}
      >
        <div className="absolute inset-3 rounded-sm border border-gold/50" />
        <img src="/images/logo.png" alt="" aria-hidden className="w-2/5 opacity-25 mix-blend-multiply" />
        <span className="mt-3 font-serif text-lg tracking-[0.2em] text-gold-dark">{code}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-contain bg-white ${className}`}
    />
  );
}
