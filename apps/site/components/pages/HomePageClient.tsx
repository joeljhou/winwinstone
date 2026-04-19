"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDialog, { FilterBar, ProductGrid, QuoteForm } from "@/components/ProductWidgets";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomePage() {
  const { language, t } = useLanguage();
  const h = t.home;
  const [filter, setFilter] = useState("all");
  const [dialogProduct, setDialogProduct] = useState<{ type: string; title: string; desc: string; image: string; category: string; titleZh: string; descZh: string } | null>(null);

  const filters = [
    { key: "all", label: h.filterAll },
    { key: "sinks", label: h.filterSinks },
    { key: "tables", label: h.filterTables },
    { key: "bathroom", label: h.filterBathroom },
  ];

  return (
    <>
      <a className="skip-link" href="#main">{t.skipLink}</a>
      <Header />

      <main id="main">
        {/* Hero */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <picture className="hero-media">
            <source srcSet="/images/minimalist-table.jpg" media="(min-width: 760px)" />
            <img src="/images/green-marble-sink.jpg" alt="Custom natural stone furniture and sink craftsmanship" />
          </picture>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{h.heroEyebrow}</p>
            <h1 id="hero-title">{h.heroTitle}</h1>
            <p className="hero-copy">{h.heroCopy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
                {h.heroQuote}
              </a>
              <Link className="button ghost" href="/products">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5z" /><path d="M9 5v14M5 10h14" /></svg>
                {h.heroProducts}
              </Link>
            </div>
            <div className="hero-social-links">
              <a href="https://wa.me/13927192948" className="social-link whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg></a>
              <a href="https://www.youtube.com/@winwinstone" className="social-link youtube" aria-label="YouTube" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" /></svg></a>
              <a href="https://www.tiktok.com/@homeplus244" className="social-link tiktok" aria-label="TikTok" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg></a>
              <a href="https://www.instagram.com/winwinstonenick" className="social-link instagram" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg></a>
            </div>
          </div>
          <div className="hero-bottom">
            {h.heroTags.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>
        </section>

        {/* Intro */}
        <section className="intro section-pad" aria-labelledby="intro-title">
          <div className="container intro-grid">
            <div>
              <p className="eyebrow">{h.introEyebrow}</p>
              <h2 id="intro-title">{h.introTitle}</h2>
            </div>
            <p>{h.introCopy}</p>
          </div>
        </section>

        {/* Products */}
        <section className="products section-pad" id="products" aria-labelledby="products-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{h.productsEyebrow}</p>
              <h2 id="products-title">{h.productsTitle}</h2>
              <p>{h.productsCopy}</p>
            </div>
            <FilterBar filters={filters} active={filter} onFilter={setFilter} />
            <ProductGrid products={t.products} filter={filter} onOpen={setDialogProduct} language={language} />
          </div>
        </section>

        {/* Video */}
        <section className="video-band" aria-labelledby="factory-title">
          <div className="container video-grid">
            <div>
              <p className="eyebrow">{h.videoEyebrow}</p>
              <h2 id="factory-title">{h.videoTitle}</h2>
              <p>{h.videoCopy}</p>
            </div>
            <video
              src="/video/custom-made.mp4"
              controls
              preload="metadata"
              poster="/images/stone-vanity.jpg"
              suppressHydrationWarning
            />
          </div>
        </section>

        {/* OEM/ODM Service */}
        <section className="service section-pad" id="service" aria-labelledby="service-title">
          <div className="container">
            <div className="section-heading compact">
              <p className="eyebrow">{h.serviceEyebrow}</p>
              <h2 id="service-title">{h.serviceTitle}</h2>
            </div>
            <ol className="process-list">
              {h.process.map((step, i) => (
                <li key={i}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why Us */}
        <section className="why section-pad" id="why-us" aria-labelledby="why-title">
          <div className="container why-grid">
            <div className="why-copy">
              <p className="eyebrow">{h.whyEyebrow}</p>
              <h2 id="why-title">{h.whyTitle}</h2>
              <p>{h.whyCopy1}</p>
              <p>{h.whyCopy2}</p>
            </div>
            <div className="proof-grid" aria-label="Company advantages">
              {h.proof.map(([title, desc], i) => (
                <div className="proof-item" key={i}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">{h.contactEyebrow}</p>
              <h2 id="contact-title">{h.contactTitle}</h2>
              <p>{h.contactCopy}</p>
              <div className="contact-lines">
                <a href="mailto:stone2lisa@outlook.com">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
                  stone2lisa@outlook.com
                </a>
                <a href="mailto:info@winwinstone.com">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
                  info@winwinstone.com
                </a>
                <a href="tel:+8613927192948">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 5h3l1.5 4-2 1.2a10 10 0 0 0 4.8 4.8l1.2-2 4 1.5v3A2.5 2.5 0 0 1 16.3 20C9.5 19.5 4.5 14.5 4 7.7A2.5 2.5 0 0 1 6.5 5z" /></svg>
                  +86 139 2719 2948
                </a>
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z" /><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                  Hekou Industrial Park, Yuncheng District, Yunfu, Guangdong, China
                </span>
              </div>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>

      <Footer />
      <ProductDialog product={dialogProduct} onClose={() => setDialogProduct(null)} />
    </>
  );
}
