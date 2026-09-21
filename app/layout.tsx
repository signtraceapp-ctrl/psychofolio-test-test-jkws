import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { getContent } from "@/lib/content";
import Link from "next/link";
import "./globals.css";
import { generateJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
});

export function generateMetadata(): Metadata {
  const c = getContent();
  const seo = c.seo;
  const siteUrl = seo?.siteUrl || "";
  return {
    title: { default: `${c.site.name} - ${c.site.title}`, template: `%s | ${c.site.name}` },
    description: seo?.description || c.home.description,
    robots: { index: true, follow: true },
    ...(siteUrl && {
      metadataBase: new URL(siteUrl),
      alternates: { canonical: siteUrl },
      openGraph: {
        type: "website",
        title: `${c.site.name} - ${c.site.title}`,
        description: seo?.description || c.home.description,
        url: siteUrl,
        siteName: c.site.name,
      },
    }),
    other: {
      "geo.region": "TR",
      ...(seo?.location && { "geo.placename": seo.location }),
    },
  };
}

const navLinks = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/yaklasim", label: "Yaklaşım" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const c = getContent();

  return (
    <html lang="tr" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-fg antialiased">
        {generateJsonLd().map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-primary/10 bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-display text-xl font-semibold text-fg hover:text-primary transition-colors">
              {c.site.name}
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-fg-muted hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-primary/10 bg-bg py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-fg-muted sm:px-6 lg:px-8">
            <p>{c.site.name} - {c.site.title}</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} - {c.site.copyright}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
