# 发布文档

本项目是 `pnpm` + Turborepo monorepo，包含两个独立的 Next.js 应用：

| 应用 | Vercel 项目名 | Root Directory | 说明 |
| --- | --- | --- | --- |
| 官网 | `winwinstonecustom` | `apps/site` | 产品展示、博客、OEM/ODM 服务、询盘 |
| 后台 | `winwinstoneadmin` | `apps/admin` | 内容管理后台原型 |

发布方式的整体思路不变：仍然是在 Vercel 中维护两个 Project，分别发布官网和后台。变化是项目已经从静态目录迁移到 Next.js monorepo，Vercel Project 的 `Root Directory` 需要从旧目录改到新目录。

| 应用 | 静态站旧目录 | Next.js 新目录 |
| --- | --- | --- |
| 官网 | `site` | `apps/site` |
| 后台 | `admin` | `apps/admin` |

如果 Vercel 上已经存在 `winwinstonecustom` 和 `winwinstoneadmin` 两个项目，可以继续复用，不需要重新创建。只要进入对应 Project 的 `Settings` -> `Build & Development Settings`，把 `Root Directory` 改成上表的新目录即可。不要把仓库根目录作为单个 Next.js 应用发布。

## 发布前检查

在仓库根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm build:site
pnpm build:admin
```

如果只发布官网，可以只检查：

```bash
pnpm build:site
```

如果只发布后台，可以只检查：

```bash
pnpm build:admin
```

## 通过 Vercel 网页发布

1. 将代码推送到 GitHub。
2. 打开 Vercel，选择 `Add New` -> `Project`。
3. 选择当前 GitHub 仓库。
4. 发布官网时设置：

```text
Root Directory: apps/site
Framework Preset: Next.js
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: 留空
```

5. 发布后台时重新创建一个 Vercel Project，并设置：

```text
Root Directory: apps/admin
Framework Preset: Next.js
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: 留空
```

Vercel 会根据 `Root Directory` 定位对应应用，并使用 Next.js 默认输出目录。

## 通过 Vercel CLI 发布

本机需要先登录 Vercel：

```bash
vercel login
```

推荐在仓库根目录执行 CLI 发布，避免沿用静态站时期的旧目录：

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone
```

预览发布：

```bash
vercel deploy apps/site -y
vercel deploy apps/admin -y
```

正式发布：

```bash
vercel deploy apps/site --prod -y
vercel deploy apps/admin --prod -y
```

如果已经在 Vercel Project 中把 `Root Directory` 配好，也可以进入对应应用目录发布：

```bash
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone/apps/site
vercel --prod

cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone/apps/admin
vercel --prod
```

注意旧命令里的目录已经不可再用：

```bash
# 旧静态站目录，不再作为 Next.js 发布入口
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone/site
cd /Users/joeljhou/CodeHub/joeljhou/projects/winwinstone/admin
```

## 环境变量

当前项目没有记录必须配置的生产环境变量。如果后续增加 API、数据库、CMS、邮件或对象存储，请在 Vercel Project 的 `Settings` -> `Environment Variables` 中分别配置：

- `Production`
- `Preview`
- `Development`

不要提交 `.env.local`、`.env.production` 等包含密钥的文件。

## 域名

建议域名规划：

| 应用 | 域名示例                                           |
|----|------------------------------------------------|
| 官网 | `winwinstonecustom.vercel.app` 或正式自定义域名        |
| 后台 | `winwinstoneadmin.vercel.app` 或 `admin.<正式域名>` |

如果使用自定义域名，在对应 Vercel Project 的 `Settings` -> `Domains` 中添加域名，并按 Vercel 提示配置 DNS。

## 常见问题

### Vercel 识别成根目录项目

检查 Project 设置里的 `Root Directory` 是否分别为：

```text
apps/site
apps/admin
```

### 构建命令找不到 pnpm

确认仓库根目录的 `packageManager` 字段存在，并且 Vercel 的 Install Command 使用：

```bash
pnpm install --frozen-lockfile
```

### 发布了错误应用

官网和后台应是两个独立 Vercel Project。检查当前 Project 的 `Root Directory`，不要在同一个 Project 内来回切换 `apps/site` 和 `apps/admin`。
