import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://winwinstoneadmin.vercel.app"),
  title: "内容管理后台 | 稳胜石材",
  description: "稳胜石材内容管理后台原型，用于发布产品、博客和素材内容。",
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="studio-page">{children}</body>
    </html>
  );
}
