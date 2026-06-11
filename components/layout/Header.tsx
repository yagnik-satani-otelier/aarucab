"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Logo />

        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Main navigation"
        >
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-white/90 transition-colors hover:text-gold",
                link.href === "#home" && "gold-underline text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/80 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Phone className="h-4 w-4 text-gold shrink-0" aria-hidden />
            {siteConfig.phone}
          </a>

          <a
            href={siteConfig.phoneHref}
            className="sm:hidden inline-flex items-center justify-center rounded-full border border-gold/80 p-2.5 text-gold transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Call ${siteConfig.phone}`}
          >
            <Phone className="h-5 w-5" />
          </a>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-white/10 bg-black px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-white/10">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gold"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
