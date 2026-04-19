"use client";

import { useState, FormEvent } from "react";

type TabKey = "products" | "blog" | "media";

interface FeedItem {
  title: string;
  action: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("products");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    { title: "极简洞石餐桌", action: "产品已更新" },
    { title: "适合静奢空间的洞石餐桌", action: "博客草稿已编辑" },
    { title: "天然大理石浴缸", action: "素材已替换" },
  ]);

  // Product form state
  const [prodTitle, setProdTitle] = useState("绿色大理石立柱盆");
  const [prodCategory, setProdCategory] = useState("台盆");
  const [prodMaterial, setProdMaterial] = useState("绿色大理石");
  const [prodImage, setProdImage] = useState("images/green-marble-sink.jpg");
  const [prodSlug, setProdSlug] = useState("green-marble-pedestal-sink");
  const [prodSummary, setProdSummary] = useState("天然绿色大理石定制浴室立柱盆，可调整尺寸、排水位置和表面工艺。");
  const [prodOptions, setProdOptions] = useState("材料选择、尺寸、表面工艺、水龙头孔、排水位置、边型细节、出口包装。");
  const [prodStatus, setProdStatus] = useState("草稿");

  // Blog form state
  const [blogTitle, setBlogTitle] = useState("如何为定制浴室台盆选择石材");
  const [blogCategory, setBlogCategory] = useState("石材指南");
  const [blogAuthor, setBlogAuthor] = useState("稳胜石材");
  const [blogImage, setBlogImage] = useState("images/calacatta-sink.jpg");
  const [blogSlug, setBlogSlug] = useState("choose-stone-custom-bathroom-sink");
  const [blogSummary, setBlogSummary] = useState("一篇关于如何为定制台盆项目选择大理石、洞石、石英岩和缟玛瑙的实用指南。");
  const [blogBody, setBlogBody] = useState("石材表现、表面工艺、厚度、排水、密封、包装和报价信息。");
  const [blogStatus, setBlogStatus] = useState("草稿");

  const publish = (title: string, setStatus: (s: string) => void) => {
    setStatus("已发布");
    setFeedItems((prev) => [{ title, action: "已从后台预览发布" }, ...prev]);
  };

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <header className="site-header studio-header" data-header>
        <nav className="nav-shell" aria-label="主导航">
          <a className="brand" href="https://winwinstonecustom.com/" aria-label="稳胜石材">
            <img src="/images/logo.png" alt="" width={36} height={39} />
            <span>稳胜石材</span>
          </a>
          <div className="nav-links" id="primary-nav">
            <a className="is-active" href="#">管理后台</a>
          </div>
        </nav>
      </header>

      <main className="studio-main" id="main">
        <aside className="studio-rail" aria-label="后台栏目">
          <div>
            <span className="studio-kicker">工作台</span>
            <h1>内容管理后台</h1>
          </div>
          <nav className="studio-tabs" role="tablist" aria-label="发布栏目">
            {([["products", "产品", "M5 5h14v14H5zM9 5v14M5 10h14"], ["blog", "博客", "M4 5h16v14H4zM8 9h8M8 13h6"], ["media", "素材", "M4 7h16v10H4zm8 15 3-3 2 2 2-3 3 4"]] as [TabKey, string, string][]).map(([key, label, path]) => (
              <button
                key={key}
                className={activeTab === key ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={activeTab === key}
                onClick={() => setActiveTab(key)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
                {label}
              </button>
            ))}
          </nav>
          <div className="studio-status">
            <strong>原型界面</strong>
            <span>当前仅本地预览</span>
          </div>
        </aside>

        <section className="studio-workspace">
          <div className="studio-topbar">
            <div>
              <p className="eyebrow">内容发布</p>
              <h2>产品、博客和视觉素材。</h2>
            </div>
            <a className="button secondary" href="https://winwinstonecustom.vercel.app/">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
              查看官网
            </a>
          </div>

          <div className="studio-metrics" aria-label="发布概览">
            <div><span>产品</span><strong>9</strong><small>7 个已发布，2 个草稿</small></div>
            <div><span>博客</span><strong>6</strong><small>4 篇指南，2 篇流程说明</small></div>
            <div><span>素材</span><strong>10</strong><small>目录图片已就绪</small></div>
          </div>

          {/* Products Panel */}
          <section className="studio-panel" hidden={activeTab !== "products"} aria-labelledby="product-editor-title">
            <div className="studio-panel-heading">
              <div><p className="eyebrow">产品录入</p><h3 id="product-editor-title">发布石材产品参考。</h3></div>
              <span className={`content-state${prodStatus === "已发布" ? " is-live" : ""}`}>{prodStatus}</span>
            </div>
            <div className="editor-grid">
              <form className="studio-form" onSubmit={(e: FormEvent) => { e.preventDefault(); publish(prodTitle, setProdStatus); }}>
                <label>产品标题<input value={prodTitle} onChange={(e) => setProdTitle(e.target.value)} /></label>
                <div className="form-row">
                  <label>分类<select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}><option>台盆</option><option>浴室</option><option>餐桌</option><option>工程定制</option></select></label>
                  <label>材料<select value={prodMaterial} onChange={(e) => setProdMaterial(e.target.value)}><option>绿色大理石</option><option>卡拉卡塔大理石</option><option>洞石</option><option>石英岩</option><option>缟玛瑙</option></select></label>
                </div>
                <label>图片路径<input value={prodImage} onChange={(e) => setProdImage(e.target.value)} /></label>
                <label>URL 标识<input value={prodSlug} onChange={(e) => setProdSlug(e.target.value)} /></label>
                <label>产品摘要<textarea rows={5} value={prodSummary} onChange={(e) => setProdSummary(e.target.value)} /></label>
                <label>可定制选项<textarea rows={4} value={prodOptions} onChange={(e) => setProdOptions(e.target.value)} /></label>
                <div className="studio-actions">
                  <button className="button secondary" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6z" /><path d="M9 8h6" /></svg>保存草稿</button>
                  <button className="button primary" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>发布</button>
                </div>
              </form>
              <aside className="studio-preview" aria-label="产品预览">
                <img src={`/${prodImage}`} alt="产品预览" />
                <div>
                  <span className="product-type">{prodCategory} / {prodMaterial}</span>
                  <strong>{prodTitle || "未命名石材产品"}</strong>
                  <p>{prodSummary || "填写适合发布的产品摘要。"}</p>
                </div>
              </aside>
            </div>
          </section>

          {/* Blog Panel */}
          <section className="studio-panel" hidden={activeTab !== "blog"} aria-labelledby="blog-editor-title">
            <div className="studio-panel-heading">
              <div><p className="eyebrow">博客录入</p><h3 id="blog-editor-title">发布材料文章。</h3></div>
              <span className={`content-state${blogStatus === "已发布" ? " is-live" : ""}`}>{blogStatus}</span>
            </div>
            <div className="editor-grid">
              <form className="studio-form" onSubmit={(e: FormEvent) => { e.preventDefault(); publish(blogTitle, setBlogStatus); }}>
                <label>文章标题<input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} /></label>
                <div className="form-row">
                  <label>分类<select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)}><option>石材指南</option><option>产品灵感</option><option>工厂流程</option><option>保养</option></select></label>
                  <label>作者<input value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} /></label>
                </div>
                <label>封面图片路径<input value={blogImage} onChange={(e) => setBlogImage(e.target.value)} /></label>
                <label>URL 标识<input value={blogSlug} onChange={(e) => setBlogSlug(e.target.value)} /></label>
                <label>摘要<textarea rows={5} value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} /></label>
                <label>正文提纲<textarea rows={4} value={blogBody} onChange={(e) => setBlogBody(e.target.value)} /></label>
                <div className="studio-actions">
                  <button className="button secondary" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6z" /><path d="M9 8h6" /></svg>保存草稿</button>
                  <button className="button primary" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>发布</button>
                </div>
              </form>
              <aside className="studio-preview article-preview" aria-label="文章预览">
                <img src={`/${blogImage}`} alt="文章预览" />
                <div>
                  <span className="product-type">{blogCategory} / {blogAuthor}</span>
                  <strong>{blogTitle || "未命名文章"}</strong>
                  <p>{blogSummary || "填写适合文章卡片的摘要。"}</p>
                </div>
              </aside>
            </div>
          </section>

          {/* Media Panel */}
          <section className="studio-panel" hidden={activeTab !== "media"} aria-labelledby="media-title">
            <div className="studio-panel-heading">
              <div><p className="eyebrow">素材库</p><h3 id="media-title">产品图片和材料素材。</h3></div>
              <a className="button secondary" href="https://winwinstonecustom.com/products">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
                产品目录
              </a>
            </div>
            <div className="media-grid">
              {[
                ["green-marble-sink.jpg", "绿色大理石台盆"],
                ["calacatta-sink.jpg", "卡拉卡塔台盆"],
                ["minimalist-table.jpg", "洞石餐桌"],
                ["marble-bathtub.jpg", "大理石浴缸"],
              ].map(([file, alt]) => (
                <figure key={file}>
                  <img src={`/images/${file}`} alt={alt} />
                  <figcaption>{file}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="activity-panel" aria-labelledby="activity-title">
            <div className="studio-panel-heading">
              <div><p className="eyebrow">最近动态</p><h3 id="activity-title">发布队列</h3></div>
            </div>
            <ol className="activity-list">
              {feedItems.map((item, i) => (
                <li key={i}><strong>{item.title}</strong><span>{item.action}</span></li>
              ))}
            </ol>
          </section>
        </section>
      </main>
    </>
  );
}
