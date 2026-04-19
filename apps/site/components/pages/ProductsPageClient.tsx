"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDialog, { FilterBar, ProductGrid } from "@/components/ProductWidgets";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProductsPage() {
  const { language, t } = useLanguage();
  const p = t.productsPage;
  const [filter, setFilter] = useState("all");
  const [dialogProduct, setDialogProduct] = useState<{ type: string; title: string; desc: string; image: string; category: string; titleZh: string; descZh: string } | null>(null);

  const filters = [
    { key: "all", label: t.home.filterAll },
    { key: "sinks", label: t.home.filterSinks },
    { key: "tables", label: t.home.filterTables },
    { key: "bathroom", label: t.home.filterBathroom },
    { key: "project", label: p.filterProject },
  ];

  return (
    <>
      <a className="skip-link" href="#main">{t.skipLink}</a>
      <Header />

      <main id="main">
        {/* Hero */}
        <section className="page-hero product-hero" aria-labelledby="products-hero-title">
          <picture className="page-hero-media">
            <source srcSet="/images/minimalist-table.jpg" media="(min-width: 760px)" />
            <img src="/images/stone-vanity.jpg" alt="Natural stone vanity and custom product finish" />
          </picture>
          <div className="page-hero-overlay" />
          <div className="page-hero-content">
            <p className="eyebrow">{p.heroEyebrow}</p>
            <h1 id="products-hero-title">{p.heroTitle}</h1>
            <p>{p.heroCopy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#catalog">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5z" /><path d="M9 5v14M5 10h14" /></svg>
                {p.heroBrowse}
              </a>
              <Link className="button ghost" href="/#contact">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
                {p.heroQuote}
              </Link>
            </div>
          </div>
        </section>

        {/* Catalog Intro */}
        <section className="catalog-intro section-pad" aria-label="Product directions">
          <div className="container catalog-intro-grid">
            <div>
              <p className="eyebrow">{p.introEyebrow}</p>
              <h2>{p.introTitle}</h2>
            </div>
            <div className="product-direction-list">
              {p.directions.map((d, i) => (
                <article key={i}>
                  <span>{d.num}</span>
                  <strong>{d.title}</strong>
                  <p>{d.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="products section-pad product-catalog" id="catalog" aria-labelledby="catalog-title">
          <div className="container">
            <div className="catalog-heading-row">
              <div className="section-heading">
                <p className="eyebrow">{p.catalogEyebrow}</p>
                <h2 id="catalog-title">{p.catalogTitle}</h2>
                <p>{p.catalogCopy}</p>
              </div>
            </div>
            <FilterBar filters={filters} active={filter} onFilter={setFilter} />
            <ProductGrid products={t.products} filter={filter} onOpen={setDialogProduct} language={language} />
          </div>
        </section>

        {/* Material Direction */}
        <section className="material-section section-pad" aria-labelledby="material-title">
          <div className="container material-grid">
            <div>
              <p className="eyebrow">{p.materialEyebrow}</p>
              <h2 id="material-title">{p.materialTitle}</h2>
            </div>
            <div className="spec-list">
              {p.specs.map((s, i) => (
                <div key={i}>
                  <span>{s.label}</span>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band" aria-labelledby="products-cta-title">
          <div className="container cta-band-inner">
            <div>
              <p className="eyebrow">{p.ctaEyebrow}</p>
              <h2 id="products-cta-title">{p.ctaTitle}</h2>
            </div>
            <Link className="button primary" href="/#contact">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>
              {p.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <ProductDialog product={dialogProduct} onClose={() => setDialogProduct(null)} />
    </>
  );
}
