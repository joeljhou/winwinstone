# 稳胜石材项目 — Next.js Monorepo

采用 **Turborepo + pnpm workspaces** 管理的 Next.js Monorepo，包含两个独立应用：

| 应用 | 路径           | 说明                     | 线上地址                         |
|----|--------------|------------------------|------------------------------|
| 官网 | `apps/site`  | 产品展示、博客、OEM/ODM 服务、询盘  | winwinstonecustom.vercel.app |
| 后台 | `apps/admin` | 内容管理后台原型（产品 / 博客 / 素材） | winwinstoneadmin.vercel.app  |

---

## 迁移方案：纯静态 → Next.js Monorepo

### 迁移策略

1. **CSS**：先保留原有纯 CSS 文件，通过 `import` 导入为全局样式，后续再逐步迁移到 CSS Modules 或 Tailwind。
2. **i18n**：先用轻量 `React Context + localStorage` 方案（与原 JS 逻辑一致），后续优化为 `next-intl` 路由级国际化。
3. **旧文件**：迁移完成后直接删除原 `site/` 和 `admin/` 目录。

---

### 目标目录结构

```
winwinstone/
├── apps/
│   ├── site/                    # 官网 Next.js App
│   │   ├── app/
│   │   │   ├── layout.tsx       # 根布局（Header + Footer）
│   │   │   ├── page.tsx         # 首页（原 index.html）
│   │   │   ├── products/
│   │   │   │   └── page.tsx     # 产品页（原 products.html）
│   │   │   └── blog/
│   │   │       └── page.tsx     # 博客页（原 blog.html）
│   │   ├── components/          # React 组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDialog.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── QuoteForm.tsx
│   │   │   └── LanguageToggle.tsx
│   │   ├── lib/
│   │   │   ├── translations.ts  # 翻译数据（从原 main.js 提取）
│   │   │   └── LanguageContext.tsx # i18n Context Provider
│   │   ├── public/              # 静态资源
│   │   │   ├── images/          # 原 site/assets/images/
│   │   │   └── video/           # 原 site/assets/video/
│   │   ├── styles/
│   │   │   └── globals.css      # 原 site/assets/css/styles.css
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── admin/                   # 后台 Next.js App
│       ├── app/
│       │   ├── layout.tsx
│       │   └── page.tsx         # 后台主页（原 admin/index.html）
│       ├── components/
│       │   ├── StudioHeader.tsx
│       │   ├── StudioTabs.tsx
│       │   ├── PreviewForm.tsx
│       │   └── ActivityFeed.tsx
│       ├── public/
│       │   └── images/          # 原 admin/assets/images/
│       ├── styles/
│       │   └── globals.css      # 原 admin/assets/css/styles.css
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/                    # 共享包（后续扩展）
│   └── ui/                      # 可选：共享组件
├── package.json                 # 根 package.json（workspace 配置）
├── pnpm-workspace.yaml
├── turbo.json
├── .gitignore
└── README.md
```

---

### 第〇步：准备工作

```bash
# 确保 pnpm 已安装（需要 ≥ 8）
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version

# 确保 Node.js ≥ 18
node --version
```

---

### 第一步：初始化 Monorepo 根目录

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone

# 1.1 创建根 package.json
cat > package.json << 'EOF'
{
  "name": "winwinstone",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "dev:site": "turbo dev --filter=site",
    "dev:admin": "turbo dev --filter=admin",
    "build:site": "turbo build --filter=site",
    "build:admin": "turbo build --filter=admin"
  },
  "devDependencies": {
    "turbo": "^2"
  },
  "packageManager": "pnpm@9.15.9"
}
EOF

# 1.2 创建 pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

# 1.3 创建 turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
EOF

# 1.4 更新 .gitignore
cat > .gitignore << 'EOF'
node_modules/
.next/
.turbo/
.vercel/
.env*.local
dist/
out/
*.tsbuildinfo
EOF

# 1.5 创建目录骨架
mkdir -p apps packages/ui
```

---

### 第二步：创建 apps/site（官网应用）

```bash
# 2.1 用 create-next-app 脚手架生成（在 apps/ 下）
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone
npx create-next-app@latest apps/site \
  --typescript \
  --app \
  --no-tailwind \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

> 交互提示直接回车即可，关键选项：TypeScript ✓、App Router ✓、Tailwind ✗、src/ ✗

```bash
# 2.2 修改 apps/site/package.json 的 name 字段
cd apps/site
# 手动将 "name" 改为 "site"（Turborepo 通过 name 字段 filter）
```

在 `apps/site/package.json` 中确保：

```jsonc
{
  "name": "site",
  // ...其余保持不变
}
```

---

### 第三步：迁移 site 静态资源

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone

# 3.1 复制图片和视频到 public/
mkdir -p apps/site/public/images apps/site/public/video
cp -r site/assets/images/* apps/site/public/images/
cp -r site/assets/video/* apps/site/public/video/

# 3.2 复制 CSS 到 styles/
mkdir -p apps/site/styles
cp site/assets/css/styles.css apps/site/styles/globals.css

# 3.3 删除默认生成的 app/globals.css 和 app/page.module.css
rm -f apps/site/app/globals.css apps/site/app/page.module.css
```

修改 `apps/site/app/layout.tsx`，将样式导入改为：

```tsx
import "@/styles/globals.css";

export const metadata = {
    title: "Win-Win Stone | OEM/ODM Natural Stone",
    description: "Factory-direct OEM and ODM natural stone sinks, vanities, bathtubs, tables, and custom architectural pieces from Yunfu, Guangdong, China.",
    icons: {icon: "/images/favicon.png"},
    themeColor: "#13261d",
    openGraph: {
        title: "Win-Win Stone",
        description: "Custom-made natural stone products with global delivery.",
        type: "website",
        images: ["/images/green-marble-sink.jpg"],
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
```

> **路径映射**：原 HTML 中 `assets/images/xxx.jpg` → 组件中 `/images/xxx.jpg`，`assets/video/xxx.mp4` → `/video/xxx.mp4`。

---

### 第四步：提取 i18n 翻译数据

从 `site/assets/js/main.js` 中把 `translations` 对象提取为独立 TypeScript 文件。

**创建 `apps/site/lib/translations.ts`**：

```ts
// 直接从 site/assets/js/main.js 中复制 translations 对象，添加 TS 类型导出
export const translations = {
    en: {
        metaTitle: "Win-Win Stone | OEM/ODM Natural Stone",
        // ... 完整复制原有 translations.en 对象 ...
    },
    zh: {
        metaTitle: "稳胜石材 | 天然石材 OEM/ODM 定制",
        // ... 完整复制原有 translations.zh 对象 ...
    },
} as const;

export type Language = "en" | "zh";
```

**创建 `apps/site/lib/LanguageContext.tsx`**：

```tsx
"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {translations, Language} from "./translations";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({children}: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const saved = localStorage.getItem("siteLanguage") as Language;
        if (saved === "zh" || saved === "en") setLanguage(saved);
    }, []);

    useEffect(() => {
        document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    }, [language]);

    const toggleLanguage = () => {
        const next = language === "en" ? "zh" : "en";
        setLanguage(next);
        localStorage.setItem("siteLanguage", next);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{language, toggleLanguage, t}}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}
```

然后在 `apps/site/app/layout.tsx` 中包裹 `<LanguageProvider>`：

```tsx
import {LanguageProvider} from "@/lib/LanguageContext";
import "@/styles/globals.css";

// ...metadata...

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <LanguageProvider>
            {children}
        </LanguageProvider>
        </body>
        </html>
    );
}
```

---

### 第五步：拆分 site HTML → React 组件

#### 5.1 提取公共组件

| 组件文件                            | 说明                | 标记             |
|---------------------------------|-------------------|----------------|
| `components/Header.tsx`         | 导航栏 + 语言切换 + 汉堡菜单 | `"use client"` |
| `components/Footer.tsx`         | 底部品牌 + 社交链接 + 导航  | `"use client"` |
| `components/LanguageToggle.tsx` | 中/EN 切换按钮         | `"use client"` |
| `components/ProductCard.tsx`    | 产品卡片（含 Dialog 触发） | `"use client"` |
| `components/ProductDialog.tsx`  | 产品详情弹窗 `<dialog>` | `"use client"` |
| `components/FilterBar.tsx`      | 分类筛选按钮组           | `"use client"` |
| `components/QuoteForm.tsx`      | 询盘表单（mailto 提交）   | `"use client"` |

#### 5.2 页面对应关系

| 原文件                  | → Next.js 路由 | 文件路径                              |
|----------------------|--------------|-----------------------------------|
| `site/index.html`    | `/`          | `apps/site/app/page.tsx`          |
| `site/products.html` | `/products`  | `apps/site/app/products/page.tsx` |
| `site/blog.html`     | `/blog`      | `apps/site/app/blog/page.tsx`     |

#### 5.3 HTML → JSX 转换要点

| 转换项        | 原值                                    | 新值                                     |
|------------|---------------------------------------|----------------------------------------|
| CSS 类名     | `class="..."`                         | `className="..."`                      |
| label 关联   | `for="..."`                           | `htmlFor="..."`                        |
| 自闭合标签      | `<img>` `<input>` `<br>`              | `<img />` `<input />` `<br />`         |
| 图片路径       | `assets/images/xxx.jpg`               | `/images/xxx.jpg`                      |
| 视频路径       | `assets/video/xxx.mp4`                | `/video/xxx.mp4`                       |
| 页面链接       | `products.html` / `blog.html`         | `/products` / `/blog`                  |
| 锚点链接       | `index.html#contact`                  | `/#contact`                            |
| 站内导航       | `<a href="...">`                      | `<Link href="...">` （从 `next/link` 导入） |
| 行内 SVG     | 直接保留                                  | 直接保留（React 支持）                         |
| `<script>` | 底部引入 `main.js`                        | 删除（逻辑已迁移到组件）                           |
| JSON-LD    | `<script type="application/ld+json">` | 保留，或用 Next.js Metadata API             |

#### 5.4 示例：Header 组件

```tsx
// apps/site/components/Header.tsx
"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useLanguage} from "@/lib/LanguageContext";

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const {language, toggleLanguage} = useLanguage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${navOpen ? "nav-open" : ""}`}>
            <nav className="nav-shell" aria-label="Primary navigation">
                <Link className="brand" href="/" aria-label="Win-Win Stone">
                    <img src="/images/logo.png" alt="" width={36} height={39}/>
                    <span>{language === "zh" ? "稳胜石材" : "Win-Win Stone"}</span>
                </Link>

                <button
                    className="nav-toggle"
                    type="button"
                    aria-expanded={navOpen}
                    onClick={() => setNavOpen(!navOpen)}
                >
          <span className="sr-only">
            {language === "zh" ? "打开导航" : "Open navigation"}
          </span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16"/>
                    </svg>
                </button>

                <div className={`nav-links ${navOpen ? "is-open" : ""}`}>
                    <Link href="/products" onClick={() => setNavOpen(false)}>
                        {language === "zh" ? "产品" : "Products"}
                    </Link>
                    <Link href="/blog" onClick={() => setNavOpen(false)}>
                        {language === "zh" ? "博客" : "Blog"}
                    </Link>
                    <Link href="/#service" onClick={() => setNavOpen(false)}>
                        OEM/ODM
                    </Link>
                    <Link href="/#why-us" onClick={() => setNavOpen(false)}>
                        {language === "zh" ? "为什么选我们" : "Why Us"}
                    </Link>
                    <Link href="/#contact" onClick={() => setNavOpen(false)}>
                        {language === "zh" ? "联系" : "Contact"}
                    </Link>
                </div>

                <button
                    className="language-toggle"
                    type="button"
                    onClick={toggleLanguage}
                    aria-label={language === "en" ? "Switch to Chinese" : "Switch to English"}
                >
                    <span>{language === "en" ? "中文" : "EN"}</span>
                </button>
            </nav>
        </header>
    );
}
```

---

### 第六步：创建 apps/admin（后台应用）

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone

# 6.1 脚手架
npx create-next-app@latest apps/admin \
  --typescript \
  --app \
  --no-tailwind \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack

# 6.2 修改 apps/admin/package.json 的 name 为 "admin"

# 6.3 复制静态资源
mkdir -p apps/admin/public/images
cp -r admin/assets/images/* apps/admin/public/images/

# 6.4 复制 CSS
mkdir -p apps/admin/styles
cp admin/assets/css/styles.css apps/admin/styles/globals.css
rm -f apps/admin/app/globals.css apps/admin/app/page.module.css

# 6.5 修改 admin 开发端口避免与 site 冲突
```

修改 `apps/admin/package.json`：

```jsonc
{
  "name": "admin",
  "scripts": {
    "dev": "next dev --port 3001",
    // ...其余保持
  }
}
```

修改 `apps/admin/app/layout.tsx`：

```tsx
import "@/styles/globals.css";

export const metadata = {
    title: "内容管理后台 | 稳胜石材",
    description: "稳胜石材内容管理后台原型。",
    icons: {icon: "/images/favicon.png"},
    themeColor: "#13261d",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
        <body className="studio-page">{children}</body>
        </html>
    );
}
```

#### 6.6 迁移 admin 页面与组件

将 `admin/index.html` 内容迁移为 `apps/admin/app/page.tsx`，交互拆分为组件：

| 组件                            | 说明                   |
|-------------------------------|----------------------|
| `components/StudioHeader.tsx` | 后台顶部导航栏              |
| `components/StudioTabs.tsx`   | 侧边栏 Tab 切换（产品/博客/素材） |
| `components/PreviewForm.tsx`  | 编辑表单 + 实时预览          |
| `components/ActivityFeed.tsx` | 最近动态列表               |

Tab 切换和表单预览逻辑用 `useState` 改写，与原 `admin/assets/js/main.js` 逻辑对应。

---

### 第七步：安装依赖并验证

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone

# 7.1 安装所有依赖
pnpm install

# 7.2 分别启动开发服务器
pnpm dev:site    # http://localhost:3000
pnpm dev:admin   # http://localhost:3001

# 7.3 逐页对比检查
# - 首页各 section 布局与交互
# - 产品筛选 + Dialog 弹窗
# - 博客筛选
# - 语言切换（中/EN）
# - 表单发送（mailto 跳转）
# - 后台 Tab 切换 + 表单预览 + 发布动态
```

---

### 第八步：清理旧文件

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone

# 确认新应用运行正常后，删除旧静态目录
rm -rf site/
rm -rf admin/
```

---

### 第九步：Vercel 部署配置

在 Vercel Dashboard 重新配置两个项目：

#### 官网 `winwinstonecustom`

| 配置项              | 值                                            |
|------------------|----------------------------------------------|
| Framework Preset | Next.js                                      |
| Root Directory   | `apps/site`                                  |
| Build Command    | `cd ../.. && pnpm turbo build --filter=site` |
| Install Command  | `cd ../.. && pnpm install`                   |
| Output Directory | （留空，Next.js 默认）                              |

#### 后台 `winwinstoneadmin`

| 配置项              | 值                                             |
|------------------|-----------------------------------------------|
| Framework Preset | Next.js                                       |
| Root Directory   | `apps/admin`                                  |
| Build Command    | `cd ../.. && pnpm turbo build --filter=admin` |
| Install Command  | `cd ../.. && pnpm install`                    |
| Output Directory | （留空，Next.js 默认）                               |

> Vercel 原生支持 Turborepo，使用 Git 集成推送自动部署时，只需设置 Root Directory，Build/Install 命令通常可留空让 Vercel 自动检测。

CLI 部署：

```bash
cd apps/site && vercel --prod
cd apps/admin && vercel --prod
```

---

## 本地开发

```bash
# 所有应用并行启动
pnpm dev

# 单独启动
pnpm dev:site    # http://localhost:3000
pnpm dev:admin   # http://localhost:3001

# 构建
pnpm build       # 全部
pnpm build:site  # 仅官网
pnpm build:admin # 仅后台
```

---

## 后续优化方向

- [ ] CSS → Tailwind CSS 或 CSS Modules 迁移
- [ ] i18n → `next-intl` 路由级国际化（`/en`、`/zh` 路径，利于 SEO）
- [ ] `<img>` → `next/image` 自动图片优化
- [ ] 提取共享组件到 `packages/ui`（Brand Logo、社交链接等）
- [ ] 博客内容 → MDX 或 CMS（Sanity / Contentlayer）
- [ ] admin 后台 → 接入真实 API（Supabase / Prisma）
- [ ] ESLint + Prettier 统一代码风格（`packages/eslint-config`）
