# Oğuz Atalay Kişisel Portfolyo Web Sitesi (oguzatalay.work)

Bu proje, **Oğuz Atalay**'ın kişisel portfolyo platformudur. Entegre pazarlama, influencer marketing, kampanya operasyonları, oyun/teknoloji lansmanları ve dijital varlık / blockchain deneyimlerini sergiler.

Canlı Site: [https://oguzatalay.work](https://oguzatalay.work)

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend**: React 19 + TypeScript + Vite 6
- **Stil & Tasarım**: Tailwind CSS v4 + Framer Motion (`motion`)
- **İkonlar**: Lucide React
- **CV & Dokümanlar**: ATS uyumlu Harvard standardı resume & dinamik Markdown export
- **Sunucu & Dağıtım**: Node.js / Express (statik sunucu), Nginx, Docker, PM2

---

## 📁 Proje Dizin Yapısı

```text
oguzatalay.work/
├── cv/                      # Canonical Master CV ve ATS dokümanları
│   ├── Oguz_Atalay_CV.md                         # İngilizce ana CV (Markdown)
│   ├── Oguz_Atalay_CV_TR.md                      # Türkçe ana CV (Markdown)
│   ├── Oguz_Atalay_ATS_Harvard_CV_2025.pdf       # Harvard ATS uyumlu PDF Resume
│   ├── Oguz_Atalay_ATS_Harvard_CV_2025.docx      # Düzenlenebilir Word ATS Resume
│   └── README.md                                 # CV kılavuzu
├── public/                  # Sitenin statik sunduğu kaynaklar
│   ├── certificates/        # Coursera / Google / Meta / Microsoft / Blockchain PDF sertifikaları
│   ├── cv/                  # Web'den doğrudan indirilebilen güncel CV dosyaları
│   ├── images/              # Referans kampanya görselleri ve ikonlar
│   ├── portfolio/           # Seçili portfolyo PDF çıktısı
│   ├── llms.txt             # AI ajanları ve LLM'ler için kılavuz dokümanı
│   ├── robots.txt           # AI tarayıcıları (GPTBot, ClaudeBot vb.) erişim izinleri
│   └── site-content.md      # Tüm site içeriğinin tam Markdown dökümü
├── src/                     # React UI kaynak kodları
│   ├── components/          # Header, Hero, About, Experience, SelectedWorks, Certificates, SkillsAndTools, Education, ContactSection, HarvardCVModal
│   ├── data.ts              # İki dilli (EN/TR) portfolyo, sertifika ve metrik veri havuzu
│   ├── types.ts             # TypeScript arayüz ve tip tanımları
│   ├── App.tsx              # Ana uygulama bileşeni
│   ├── index.css            # Global CSS ve stil kuralları
│   └── main.tsx             # React render giriş noktası
├── tools/                   # Referans envanteri, site-content ve PDF üretim araçları
├── references/              # Ham referans veritabanı ve envanter
├── Dockerfile               # Docker konteyner yapılandırması
├── docker-compose.yml       # Docker Compose servisi
├── nginx.conf               # Üretim Nginx yapılandırması
├── ecosystem.config.cjs     # PM2 süreç yönetimi
├── deploy.sh                # Dağıtım scripti
├── package.json
└── tsconfig.json
```

---

## 🚀 Yerel Geliştirme (Local Development)

### Gereksinimler
- Node.js (v18+)
- npm

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```
Uygulama `http://localhost:3000` adresinde yerel olarak sunulur.

### 3. Üretim Derlemesi (Production Build)
```bash
npm run build
npm run preview
```

### 4. Tip Kontrolü (Lint / TypeScript Check)
```bash
npm run lint
```

---

## 📄 CV ve İletişim

- **E-posta**: [oguz@oguzatalay.work](mailto:oguz@oguzatalay.work)
- **LinkedIn**: [linkedin.com/in/oguzatalay96](https://www.linkedin.com/in/oguzatalay96/)
- **Web**: [oguzatalay.work](https://oguzatalay.work)
