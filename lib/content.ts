import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { z } from "zod";

// ── Zod schema (all optional — validates buyer overrides) ──

const metin = z.string().max(5000);

const siteContentInputSchema = z.object({
  site: z
    .object({
      name: metin,
      title: metin,
      email: metin,
      phone: metin,
      address: metin,
      copyright: metin,
    })
    .partial()
    .optional(),

  home: z
    .object({
      badge: metin,
      headline: metin,
      headlineAccent: metin,
      headlineSuffix: metin,
      description: metin,
      cta: metin,
      cardTitle: metin,
      cardSubtitle: metin,
      quote: metin,
      quoteAuthor: metin,
    })
    .partial()
    .optional(),

  metrics: z
    .array(z.object({ val: metin, unit: metin, label: metin }))
    .optional(),

  services: z
    .array(
      z.object({ title: metin, desc: metin, duration: metin, method: metin }),
    )
    .optional(),

  about: z
    .object({
      title: metin,
      intro: metin,
      introSecond: metin,
      credentials: z.array(
        z.object({ year: metin, title: metin, detail: metin }),
      ),
    })
    .partial()
    .optional(),

  approach: z
    .object({
      title: metin,
      intro: metin,
      principles: z.array(z.object({ title: metin, desc: metin })),
    })
    .partial()
    .optional(),

  articles: z
    .array(
      z.object({
        title: metin,
        category: metin,
        readTime: metin,
        date: metin,
      }),
    )
    .optional(),

  faq: z.array(z.object({ q: metin, a: metin })).optional(),

  contact: z
    .object({
      title: metin,
      intro: metin,
      formName: metin,
      formEmail: metin,
      formMessage: metin,
      formSubmit: metin,
    })
    .partial()
    .optional(),

  seo: z
    .object({
      jobTitle: metin,
      description: metin,
      specialties: z.array(metin),
      credentials: z.array(metin),
      location: metin,
      siteUrl: metin,
      socialLinks: z.array(metin),
      alumniOf: z.array(metin),
      openingHours: metin,
    })
    .partial()
    .optional(),
});

// ── Resolved type (what pages consume — everything required) ──

export interface SiteContent {
  site: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    address: string;
    copyright: string;
  };
  home: {
    badge: string;
    headline: string;
    headlineAccent: string;
    headlineSuffix: string;
    description: string;
    cta: string;
    cardTitle: string;
    cardSubtitle: string;
    quote: string;
    quoteAuthor: string;
  };
  metrics: {
    val: string;
    unit: string;
    label: string;
  }[];
  services: {
    title: string;
    desc: string;
    duration: string;
    method: string;
  }[];
  about: {
    title: string;
    intro: string;
    introSecond?: string;
    credentials: { year: string; title: string; detail: string }[];
  };
  approach: {
    title: string;
    intro: string;
    principles: { title: string; desc: string }[];
  };
  articles: {
    title: string;
    category: string;
    readTime: string;
    date: string;
  }[];
  faq: { q: string; a: string }[];
  contact: {
    title: string;
    intro: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  seo?: {
    jobTitle: string;
    description: string;
    specialties: string[];
    credentials: string[];
    location: string;
    siteUrl?: string;
    socialLinks?: string[];
    alumniOf?: string[];
    openingHours?: string;
  };
}

// ── Hardcoded defaults (fallback if site.json is missing fields) ──

const DEFAULTS: SiteContent = {
  site: {
    name: "Ad Soyad",
    title: "Klinik Psikolog",
    email: "bilgi@klinik.com",
    address: "Istanbul",
    copyright: "Tum haklari saklidir.",
  },
  home: {
    badge: "SERENE",
    headline: "Zihnin sessizliginde,",
    headlineAccent: "kendi yolunuzu",
    headlineSuffix: "bulun.",
    description:
      "Guvene dayali, yavas ve derinlemesine calisan bir terapi yaklasimi ile icsel dengenizi yeniden insa edin.",
    cta: "Randevu Talep Et",
    cardTitle: "Sakinlik & Denge",
    cardSubtitle: "Butunsel Terapi Yaklasimi",
    quote: "Disari bakan ruya gorur, iceri bakan uyanir.",
    quoteAuthor: "Carl Gustav Jung",
  },
  metrics: [
    { val: "12+", unit: "Yil", label: "Klinik Deneyim" },
    { val: "4500+", unit: "", label: "Tamamlanmis Seans" },
    { val: "8", unit: "+", label: "Akademik Yayin" },
    { val: "%100", unit: "", label: "Etik Taahhut" },
  ],
  services: [
    {
      title: "Bireysel Psikoterapi",
      desc: "Stres, kaygi, depresyon ve yasam degisimlerinde bireysel farkindalik yolculugu.",
      duration: "50 dk",
      method: "CBT / Sema Terapi",
    },
  ],
  about: {
    title: "Hakkimda",
    intro: "Klinik psikoloji yolculugum, insanin kendisiyle barisma arayisini anlama arzusuyla basladi.",
    credentials: [
      {
        year: "2014",
        title: "Psikoloji Lisans",
        detail: "Universite mezuniyeti",
      },
    ],
  },
  approach: {
    title: "Terapi Yaklasimim",
    intro: "Terapi, yasamin karmasasi icinde durup kendimize bakabildigimiz sessiz bir taniklik alanidir.",
    principles: [
      { title: "Guvenli Alan", desc: "Tam gizlilige dayali terapotik alan." },
    ],
  },
  articles: [
    {
      title: "Kaygi Bozukluklarinda Bilissel Yeniden Yapilandirma",
      category: "Klinik",
      readTime: "8 dk",
      date: "28 Mayis 2026",
    },
  ],
  faq: [
    {
      q: "Ilk terapi seansinda ne yapiliyor?",
      a: "Ilk seans, birbirimizi tanidiginiz bir on degerlendirme seansidir.",
    },
  ],
  contact: {
    title: "Randevu ve Iletisim",
    intro: "Icsel yolculugunuza adim atmak icin bana yazabilirsiniz.",
    formName: "Adiniz",
    formEmail: "E-posta",
    formMessage: "Mesajiniz",
    formSubmit: "Gonder",
  },
};

// ── Merge helper ──

function birlestir<T extends Record<string, unknown>>(
  varsayilan: T,
  gelen?: Partial<T>,
): T {
  if (!gelen) return varsayilan;
  const cikti = { ...varsayilan };
  for (const [k, v] of Object.entries(gelen)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    (cikti as Record<string, unknown>)[k] = v;
  }
  return cikti;
}

// ── Content loader ──

let cached: SiteContent | null = null;

export function getContent(): SiteContent {
  if (cached) return cached;

  // Primary: site.json (ships with the template)
  const defaultsPath = join(process.cwd(), "content", "site.json");
  let base: SiteContent = DEFAULTS;

  if (existsSync(defaultsPath)) {
    try {
      const raw = JSON.parse(readFileSync(defaultsPath, "utf-8"));
      const parsed = siteContentInputSchema.safeParse(raw);

      if (parsed.success) {
        const g = parsed.data;
        base = {
          site: birlestir(DEFAULTS.site, g.site),
          home: birlestir(DEFAULTS.home, g.home),
          metrics:
            g.metrics && g.metrics.length > 0
              ? (g.metrics as SiteContent["metrics"])
              : DEFAULTS.metrics,
          services:
            g.services && g.services.length > 0
              ? (g.services as SiteContent["services"])
              : DEFAULTS.services,
          about: birlestir(DEFAULTS.about, g.about),
          approach: birlestir(DEFAULTS.approach, g.approach),
          articles:
            g.articles && g.articles.length > 0
              ? (g.articles as SiteContent["articles"])
              : DEFAULTS.articles,
          faq:
            g.faq && g.faq.length > 0
              ? (g.faq as SiteContent["faq"])
              : DEFAULTS.faq,
          contact: birlestir(DEFAULTS.contact, g.contact),
        };
      } else {
        // Parse failed — fall back to raw with defaults
        base = {
          site: birlestir(DEFAULTS.site, raw.site),
          home: birlestir(DEFAULTS.home, raw.home),
          metrics: Array.isArray(raw.metrics) && raw.metrics.length > 0 ? raw.metrics : DEFAULTS.metrics,
          services: Array.isArray(raw.services) && raw.services.length > 0 ? raw.services : DEFAULTS.services,
          about: birlestir(DEFAULTS.about, raw.about),
          approach: birlestir(DEFAULTS.approach, raw.approach),
          articles: Array.isArray(raw.articles) && raw.articles.length > 0 ? raw.articles : DEFAULTS.articles,
          faq: Array.isArray(raw.faq) && raw.faq.length > 0 ? raw.faq : DEFAULTS.faq,
          contact: birlestir(DEFAULTS.contact, raw.contact),
        };
      }
    } catch (e) {
      console.error("[content] site.json okunamadi, varsayilanlar kullaniliyor:", e);
    }
  }

  // Optional overrides: content.json (buyer fills what they want)
  const overridesPath = join(process.cwd(), "content", "content.json");
  if (existsSync(overridesPath)) {
    try {
      const raw = JSON.parse(readFileSync(overridesPath, "utf-8"));
      const parsed = siteContentInputSchema.safeParse(raw);

      if (parsed.success && Object.keys(parsed.data).length > 0) {
        const g = parsed.data;
        base = {
          site: birlestir(base.site, g.site),
          home: birlestir(base.home, g.home),
          metrics:
            g.metrics && g.metrics.length > 0
              ? (g.metrics as SiteContent["metrics"])
              : base.metrics,
          services:
            g.services && g.services.length > 0
              ? (g.services as SiteContent["services"])
              : base.services,
          about: birlestir(base.about, g.about),
          approach: birlestir(base.approach, g.approach),
          articles:
            g.articles && g.articles.length > 0
              ? (g.articles as SiteContent["articles"])
              : base.articles,
          faq:
            g.faq && g.faq.length > 0
              ? (g.faq as SiteContent["faq"])
              : base.faq,
          contact: birlestir(base.contact, g.contact),
        };
      }
    } catch (e) {
      console.error("[content] content.json gecersiz, atlanıyor:", e);
    }
  }

  cached = base;
  return cached;
}
