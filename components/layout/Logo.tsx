import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Logo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <Link href="/#home" className="flex items-start gap-2.5 group">
      <Image
        src="/logo.svg"
        alt=""
        width={36}
        height={42}
        className="shrink-0 mt-0.5"
        aria-hidden
      />
      <div>
        <div className="text-lg font-bold leading-tight tracking-tight">
          <span className="text-white">aaru </span>
          <span className="text-gold">cab</span>
        </div>
        {showTagline && (
          <p className="text-[10px] sm:text-xs text-white/80 leading-snug mt-0.5">
            {siteConfig.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
