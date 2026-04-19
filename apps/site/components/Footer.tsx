"use client";

import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <img src="/images/logo.png" alt="" width={36} height={39} />
            <span>{t.brandName}</span>
          </Link>
          <p>{t.footerCopy}</p>
          <div className="social-links">
            <a href="https://wa.me/13927192948" className="social-link whatsapp" aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
            </a>
            <a href="https://www.youtube.com/@winwinstone" className="social-link youtube" aria-label="YouTube" title="YouTube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" /></svg>
            </a>
            <a href="https://www.tiktok.com/@homeplus244" className="social-link tiktok" aria-label="TikTok" title="TikTok" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
            </a>
            <a href="https://www.instagram.com/winwinstonenick" className="social-link instagram" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/products">{t.nav.products}</Link>
          <Link href="/blog">{t.nav.blog}</Link>
          <Link href="/#service">{t.nav.oem}</Link>
          <Link href="/#why-us">{t.nav.whyUs}</Link>
          <Link href="/#contact">{t.nav.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
