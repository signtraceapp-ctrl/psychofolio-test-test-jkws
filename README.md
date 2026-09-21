# Serene - Psychofolio Web Sitesi Şablonu

Psikologlar için minimal, sakin ve ferah bir web sitesi şablonu.

## İçerik düzenleme

Tüm metinler `content/site.json` dosyasındadır. Kod düzenlemeniz gerekmez.

Alanların tam listesi için `lib/content.ts` dosyasına bakın.

## Kendi sitenizi yayına alma

1. Bu repo'yu GitHub hesabınıza fork'layın
2. `content/site.json` dosyasını kendi bilgilerinizle düzenleyin
3. `public/serene_hero.png` görselini kendi görselinizle değiştirin
4. Vercel'de "New Project" > GitHub repo'nuzu seçin > Deploy
5. Otomatik olarak yayına alınır, SSL dahildir

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

## 7 Sayfa

| Yol | Sayfa |
|---|---|
| `/` | Ana Sayfa |
| `/hakkimda` | Hakkımda |
| `/hizmetler` | Hizmetler |
| `/yaklasim` | Yaklaşım |
| `/yazilar` | Yazılar |
| `/sss` | Sık Sorulan Sorular |
| `/iletisim` | İletişim |

## Teknoloji

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- TypeScript
