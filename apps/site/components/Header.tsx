"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setNavOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${navOpen ? " nav-open" : ""}`} data-header>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label={t.brandName}>
          <img src="/images/logo.png" alt="" width={36} height={39} />
          <span>{t.brandName}</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="sr-only">{t.openNav}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>

        <div className={`nav-links${navOpen ? " is-open" : ""}`} id="primary-nav">
          <Link href="/products" onClick={close}>{t.nav.products}</Link>
          <Link href="/blog" onClick={close}>{t.nav.blog}</Link>
          <Link href="/#service" onClick={close}>{t.nav.oem}</Link>
          <Link href="/#why-us" onClick={close}>{t.nav.whyUs}</Link>
          <Link href="/#contact" onClick={close}>{t.nav.contact}</Link>
        </div>

        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={t.switchAria}
        >
          <span>{t.switchLabel}</span>
        </button>
      </nav>
    </header>
  );
}

