"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  const b = t.blogPage;
  const [filter, setFilter] = useState("all");

  const blogFilters = [
    { key: "all", label: b.filterAll },
    { key: "guide", label: b.filterGuide },
    { key: "ideas", label: b.filterIdeas },
    { key: "process", label: b.filterProcess },
    { key: "care", label: b.filterCare },
  ];

  return (
    <>
      <a className="skip-link" href="#main">{t.skipLink}</a>
      <Header />

      <main id="main">
        {/* Hero */}
        <section className="page-hero journal-hero" aria-labelledby="journal-hero-title">
          <picture className="page-hero-media">
            <source srcSet="/images/green-marble-sink-hero.jpg" media="(min-width: 760px)" />
            <img src="/images/minimalist-table-hero.jpg" alt="Natural stone product detail for editorial guide" />
          </picture>
          <div className="page-hero-overlay" />
          <div className="page-hero-content">
            <p className="eyebrow">{b.heroEyebrow}</p>
            <h1 id="journal-hero-title">{b.heroTitle}</h1>
            <p>{b.heroCopy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#articles">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h6" /></svg>
                {b.heroRead}
              </a>
              <Link className="button ghost" href="/products">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5z" /><path d="M9 5v14M5 10h14" /></svg>
                {b.heroCatalog}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Guide */}
        <section className="journal-feature section-pad" aria-labelledby="feature-title">
          <div className="container feature-story">
            <Image
              src="/images/calacatta-sink.jpg"
              alt="Calacatta stone sink material detail"
              width={800}
              height={1000}
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <div>
              <p className="eyebrow">{b.featureEyebrow}</p>
              <h2 id="feature-title">{b.featureTitle}</h2>
              <p>{b.featureCopy}</p>
              <div className="story-meta">
                {b.featureMeta.map((m, i) => <span key={i}>{m}</span>)}
              </div>
              <a className="text-link" href="#articles">
                <span>{b.featureLink}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Article Library */}
        <section className="article-section section-pad" id="articles" aria-labelledby="articles-title">
          <div className="container">
            <div className="catalog-heading-row">
              <div className="section-heading">
                <p className="eyebrow">{b.articlesEyebrow}</p>
                <h2 id="articles-title">{b.articlesTitle}</h2>
                <p>{b.articlesCopy}</p>
              </div>
            </div>
            <div className="filter-bar" role="tablist" aria-label="Article filters">
              {blogFilters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-button${filter === f.key ? " active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="article-grid">
              {b.articles.map((a, i) => {
                const cats = a.category.split(" ");
                const hidden = filter !== "all" && !cats.includes(filter);
                return (
                  <article key={i} className={`article-card${hidden ? " is-hidden" : ""}`}>
                    <a href="#articles">
                      <Image
                        src={`/images/${a.image}`}
                        alt={a.title}
                        width={800}
                        height={500}
                        sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw"
                      />
                      <span className="article-body">
                        <span className="product-type">{a.type}</span>
                        <strong>{a.title}</strong>
                        <span>{a.desc}</span>
                        <span className="article-date">{a.date}</span>
                      </span>
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band" aria-labelledby="journal-cta-title">
          <div className="container cta-band-inner">
            <div>
              <p className="eyebrow">{b.ctaEyebrow}</p>
              <h2 id="journal-cta-title">{b.ctaTitle}</h2>
            </div>
            <Link className="button primary" href="/#contact">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
              {b.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
