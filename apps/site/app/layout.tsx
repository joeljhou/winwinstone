import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://winwinstonecustom.vercel.app"),
  title: "Win-Win Stone | OEM/ODM Natural Stone",
  description:
    "Factory-direct OEM and ODM natural stone sinks, vanities, bathtubs, tables, and custom architectural pieces from Yunfu, Guangdong, China.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    title: "Win-Win Stone",
    description:
      "Custom-made natural stone products with global delivery, factory-backed craftsmanship, and OEM/ODM service.",
    type: "website",
    images: ["/images/green-marble-sink.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
