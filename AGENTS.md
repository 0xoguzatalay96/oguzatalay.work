# Oğuz Atalay Portfolio - Workspace Architecture & AI Guidelines

Bu belge, **oguzatalay.work** projesinin mimarisini, bileşenlerini, veri kaynaklarını, ATS / Resume-Matcher standartlarını ve katı AI kurallarını tanımlar.

---

## 🎯 Temel Marka ve Profil Kuralları (Kesin Kurallar)

1. **Sabit Unvan ve Başlık Standardı:**
   - Her yerde (HTML `<title>`, `og:title`, `twitter:title`, sayfa `<h1>`, tüm CV dosyaları ve modal başlıkları) istisnasız şu unvan kullanılır:
     ```
     Influencer Marketing Manager | Digital Assets Marketing Operations
     ```
   - Çıplak veya belirsiz "Marketing Manager" unvanı tek başına kullanılmaz.

2. **Sıfır "Leadership" / "Liderlik" Politikası:**
   - Hiçbir meta-açıklamada, CV'de, yetkinlikte veya içerikte "leadership" / "liderlik" kelimesi geçmez. Bunun yerine operasyon, koordinasyon, ortaklık ve yönetim ifadeleri kullanılır.

3. **Terminoloji Dönüşümü:**
   - "Web2" yerine: `consumer brand campaigns` / `established brand campaigns` / `tüketici markası kampanyaları`
   - "Web3" yerine: `digital asset / blockchain launches` / `dijital varlık ve blokzincir lansmanları`
   - *(Tek İstisna: "Web3 and Blockchain in Global Commerce" resmi INSEAD sertifika başlığıdır ve değiştirilmez).*

4. **Kayan Logo Şeridi (Marquee) Yasağı:**
   - Ana sayfada kayan marka logoları yer almaz (ajans algısı yaratmamak için). Tüm marka referansları (Red Bull, ASUS, Migros, Koton, Yuga Labs, adidas) "Selected Works" altında rol ve KPI bağlamıyla sunulur.

---

## 📄 ATS ve Resume-Matcher Uyumluluğu

CV altyapısı, [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) açık kaynaklı ATS optimizasyon aracı ve Harvard ATS standartlarıyla %100 uyumludur:

- **Tek Master CV Yapısı:** Ayrı ajans veya kripto CV'leri yerine tüm 10+ yıllık deneyimi kronolojik olarak aktaran tek kapsamlı master CV kullanılır.
- **İki Dönemli Kariyer Anlatısı (Two-Chapter Narrative):**
  1. Geleneksel Influencer & Marka Pazarlaması (TEM Agency, H2O United, 2Gether Social - Red Bull, ASUS, Migros, Koton, DeFacto).
  2. Dijital Varlık ve Blokzincir Operasyonları (Metafluence, adidas Originals, Yuga Labs).
- **Desteklenen ve Sunulan Formatlar:**
  - `Oguz_Atalay_CV.md` & `Oguz_Atalay_CV_TR.md` (Doğrudan parse edilebilir ATS Markdown)
  - `Oguz_Atalay_ATS_Harvard_CV_2025.docx` (Kurumsal İK ATS sistemleri için Word formatı)
  - `Oguz_Atalay_ATS_Harvard_CV_2025.pdf` (Harvard ATS standardı PDF formatı)

---

## 🏗️ Proje Mimarisi

- **Frontend:** React 19 + TypeScript + Vite 6
- **Stil & Tasarım:** Tailwind CSS v4 + Motion (`motion/react`)
- **Tasarım Dili:** Brutalist / High-End Dark Mode (`#131313`, imza kırmızı `#FF0000`, teknik grid kenarlıkları `#2a2a2a`, mono fontlar).
- **Çok Dillilik:** [src/data.ts](file:///root/Projeler/oguzatalay.work/src/data.ts) üzerinde merkezi `EN_TRANSLATION` / `TR_TRANSLATION` veri seti.
- **Sunucu & Dağıtım:** Node.js Express (`server.js`), Systemd servisi (`oguzatalay-website.service` / port 8096), Cloudflare Tunnel.

---

## 📂 Dizin Hiyerarşisi

- `src/components/`:
  - `Header.tsx`: Sabit başlık, dil seçimi (EN/TR), CV modal tetikleyicisi, dinamik scroll takibi.
  - `Hero.tsx`: Statik H1 başlığı, net profil aksiyon butonları.
  - `About.tsx`: Hakkımda, 10+ yıl / 200+ partner / 150+ kampanya metrikleri, stratejik uyum kartları.
  - `Experience.tsx`: Profesyonel iş geçmişi (Independent, Yuga Labs, adidas Originals, Metafluence, 2Gether, H2O, TEM).
  - `SelectedWorks.tsx`: Seçili kampanya kartları, KPI rozetleri, referans linkleri.
  - `Certificates.tsx`: Doğrulanmış Coursera/Google/Meta/Microsoft/Duke/INSEAD sertifika kartları.
  - `SkillsAndTools.tsx`: Temel yetkinlikler ve veri/operasyon araçları.
  - `Education.tsx`: Üniversite ve akademik dereceler.
  - `ContactSection.tsx`: İletişim, doğrudan WhatsApp ve e-posta alanı.
  - `HarvardCVModal.tsx`: ATS / Resume-Matcher uyumlu interaktif CV görüntüleme ve indirme modalı.
- `public/`:
  - `certificates/`: Tüm orijinal Coursera sertifika PDF'leri.
  - `cv/`: ATS ve Resume-Matcher uyumlu Markdown, DOCX ve PDF CV dokümanları.
  - `llms.txt`: AI ajanları için rehber doküman.
  - `site-content.md`: Sitenin tam içeriğinin Markdown dökümü.
- `tools/`:
  - `export_site_markdown.ts`: `src/data.ts`'deki verileri `SITE_CONTENT.md` ve `public/site-content.md`'ye aktaran script.

---

## ⚙️ Geliştirme, Derleme ve Dağıtım Komutları

```bash
# Tip kontrolü ve Derleme
npm run lint
npm run build

# Markdown senkronizasyonu
npx tsx tools/export_site_markdown.ts > SITE_CONTENT.md && cp SITE_CONTENT.md public/site-content.md && cp SITE_CONTENT.md dist/site-content.md && cp -r public/cv dist/

# Servis Yeniden Başlatma
systemctl restart oguzatalay-website.service
```
