"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/LanguageContext";

interface ProductDialogProps {
  product: { type: string; title: string; titleZh: string; desc: string; descZh: string; image: string; category: string } | null;
  onClose: () => void;
}

export default function ProductDialog({ product, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (product && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [product]);

  const close = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog className="product-dialog" ref={dialogRef} onClick={(e) => { if (e.target === dialogRef.current) close(); }}>
      <button className="dialog-close" type="button" onClick={close} aria-label="Close product details">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      {product && (
        <>
          <Image
            src={`/images/${product.image}`}
            alt={language === "zh" ? product.titleZh : product.title}
            width={900}
            height={675}
            sizes="(max-width: 760px) 100vw, 560px"
          />
          <div className="dialog-content">
            <p className="eyebrow">{t.home.dialogEyebrow}</p>
            <h3>{language === "zh" ? product.titleZh : product.title}</h3>
            <p>{language === "zh" ? product.descZh : product.desc}</p>
            <Link className="button primary" href="/#contact" onClick={close}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>
              {t.home.dialogQuote}
            </Link>
          </div>
        </>
      )}
    </dialog>
  );
}

interface FilterBarProps {
  filters: { key: string; label: string }[];
  active: string;
  onFilter: (key: string) => void;
}

export function FilterBar({ filters, active, onFilter }: FilterBarProps) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Product filters">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`filter-button${active === f.key ? " active" : ""}`}
          type="button"
          role="tab"
          aria-selected={active === f.key}
          onClick={() => onFilter(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

interface ProductItem {
  type: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  titleZh: string;
  descZh: string;
}

interface ProductGridProps {
  products: readonly ProductItem[];
  filter: string;
  onOpen: (p: ProductItem) => void;
  language: string;
}

export function ProductGrid({ products, filter, onOpen, language }: ProductGridProps) {
  return (
    <div className="product-grid" data-product-grid>
      {products.map((p, i) => {
        const cats = p.category.split(" ");
        const hidden = filter !== "all" && !cats.includes(filter);
        return (
          <article key={i} className={`product-card${hidden ? " is-hidden" : ""}`} data-category={p.category}>
            <button className="product-open" type="button" onClick={() => onOpen(p)}>
              <Image
                src={`/images/${p.image}`}
                alt={language === "zh" ? p.titleZh : p.title}
                width={800}
                height={600}
                sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw"
              />
              <span className="product-body">
                <span className="product-type">{p.type}</span>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </span>
            </button>
          </article>
        );
      })}
    </div>
  );
}

export function QuoteForm() {
  const { t } = useLanguage();
  const h = t.home;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") || "";
    const email = form.get("email") || "";
    const subject = (form.get("subject") as string) || t.mail.defaultSubject;
    const message = form.get("message") || "";
    const body = [`Name: ${name}`, `Email: ${email}`, `Project: ${subject}`, "", message].join("\n");
    const mailto = new URL("mailto:stone2lisa@outlook.com");
    mailto.searchParams.set("subject", `${t.mail.quotePrefix}: ${subject}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <label>{h.formName}<input name="name" autoComplete="name" required /></label>
      <label>{h.formEmail}<input name="email" type="email" autoComplete="email" required /></label>
      <label>{h.formSubject}<input name="subject" placeholder={h.placeholderSubject} /></label>
      <label>{h.formMessage}<textarea name="message" rows={5} placeholder={h.placeholderMessage} /></label>
      <button className="button primary wide" type="submit">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>
        {h.formSubmit}
      </button>
    </form>
  );
}
