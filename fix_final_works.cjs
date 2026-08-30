const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const startIndex = content.indexOf("export const ENGLISH_WORKS: SelectedWork[] = [");
const endIndex = content.indexOf("export const ENGLISH_SKILLS: SkillCategory[] = [");

const newWorks = `export const ENGLISH_WORKS: SelectedWork[] = [
  {
    id: "migros-campaigns",
    title: "Migros - #ReyonSavaşları",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6.7M VIEWS | 3.4M COMMENTS | 74% ENGAGEMENT",
    image: "https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2021/02/23/thumbs_b_c_cb938ae1782baa1b8db45f6905f30112.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=I8G9adrIyVM", "platform": "", "label": "" }]
  },
  {
    id: "adidas-originals",
    title: "adidas Originals - Into the Metaverse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6,755 HOLDERS | 72.7% BRAND LOYALTY | $93M+",
    image: "https://i.ytimg.com/vi/EVQ6fPrwi0M/maxresdefault.jpg",
    links: [{ "url": "https://news.adidas.com/originals/virtual-gear-for-new-realities--adidas-originals-launches-inaugural-nft-wearables-collection/s/b9c13f73-b7b4-412f-9e19-f8a4d9781621", "platform": "", "label": "" }]
  },
  {
    id: "koton",
    title: "Koton - #EtiketleriÇıkar",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6.3M VIEWS | 630K LIKES | 24K COMMENTS",
    image: "https://i.ytimg.com/vi/mqi0DQ8OnWs/maxresdefault.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=mqi0DQ8OnWs", "platform": "", "label": "" }]
  },
  {
    id: "redbull-events",
    title: "Red Bull - GIST 2020",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "2.4M IMPRESSIONS | 650K VIEWS | 1.2M REACH",
    image: "https://img.redbull.com/images/c_crop,w_6291,h_3146,x_0,y_0/c_auto,w_1200,h_600/f_auto,q_auto/redbullcom/2020/1/30/zz4ny7x92bs3gqthtgxl/gist-2020",
    links: [{ "url": "https://www.redbull.com/tr-tr/events/gaming-istanbul", "platform": "", "label": "" }]
  },
  {
    id: "defacto-tiktok",
    title: "DeFacto - #HavalıveRahat",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "3.1M VIEWS | 320K LIKES | 17K COMMENTS",
    image: "https://www.marketingturkiye.com.tr/wp-content/uploads/2020/09/shutterstock_image-82.jpg.webp",
    links: [{ "url": "https://www.tiktok.com/@defacto/video/6875222921502166273", "platform": "", "label": "" }]
  },
  {
    id: "yuga-labs-dragon",
    title: "Yuga Labs - Project Dragon Event",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.2M IMPRESSIONS | 12.5K+ LIKES | 2264 PLAYERS",
    image: "https://i.ytimg.com/vi/FIROJqiHWxk/maxresdefault.jpg",
    links: [{ "url": "https://www.yuga.com/", "platform": "", "label": "" }]
  },
  {
    id: "eti-challenges",
    title: "Eti - #eticinlegülümse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "15.4M VIEWS | 685K LIKES | 9K COMMENTS",
    image: "https://i.ytimg.com/vi/5s7d7No7WsM/maxresdefault.jpg",
    links: [{ "url": "https://www.tiktok.com/@mutlulukdeninceakla/video/6895369042413079810?lang=tr-TR", "platform": "", "label": "" }]
  },
  {
    id: "hp-omen",
    title: "HP Omen - LoL Challenge",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.8M VIEWS | 162K LIKES | 1200 PARTICIPANTS",
    image: "https://cdn.imagevisit.com/2026/07/14/509855670_3629034160560724_3729600696970880300_n.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=R9K1xL2hX9g", "platform": "", "label": "" }]
  },
  {
    id: "metafluence-launch",
    title: "Metafluence Ecosystem",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "100% SOLD OUT | 305 TXS | $50K RAISED",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800",
    links: [{ "url": "https://metafluence.com/", "platform": "", "label": "" }]
  },
  {
    id: "yuga-labs",
    title: "Yuga Labs",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "AUG 2024 | APECHAIN ALPHA LAUNCH",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    links: [{ "url": "https://www.yuga.com/", "platform": "", "label": "" }]
  }
];

export const TURKISH_WORKS: SelectedWork[] = [
  {
    id: "migros-campaigns",
    title: "Migros - #ReyonSavaşları",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6.7M İZLENME | 3.4M YORUM | %74 ETKİLEŞİM",
    image: "https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2021/02/23/thumbs_b_c_cb938ae1782baa1b8db45f6905f30112.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=I8G9adrIyVM", "platform": "", "label": "" }]
  },
  {
    id: "adidas-originals",
    title: "adidas Originals - Into the Metaverse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6,755 HOLDER | %72.7 SADAKAT | $93M+",
    image: "https://i.ytimg.com/vi/EVQ6fPrwi0M/maxresdefault.jpg",
    links: [{ "url": "https://news.adidas.com/originals/virtual-gear-for-new-realities--adidas-originals-launches-inaugural-nft-wearables-collection/s/b9c13f73-b7b4-412f-9e19-f8a4d9781621", "platform": "", "label": "" }]
  },
  {
    id: "koton",
    title: "Koton - #EtiketleriÇıkar",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6.3M İZLENME | 630K BEĞENİ | 24K YORUM",
    image: "https://i.ytimg.com/vi/mqi0DQ8OnWs/maxresdefault.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=mqi0DQ8OnWs", "platform": "", "label": "" }]
  },
  {
    id: "redbull-events",
    title: "Red Bull - GIST 2020",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "2.4M GÖSTERİM | 650K İZLENME | 1.2M ERİŞİM",
    image: "https://img.redbull.com/images/c_crop,w_6291,h_3146,x_0,y_0/c_auto,w_1200,h_600/f_auto,q_auto/redbullcom/2020/1/30/zz4ny7x92bs3gqthtgxl/gist-2020",
    links: [{ "url": "https://www.redbull.com/tr-tr/events/gaming-istanbul", "platform": "", "label": "" }]
  },
  {
    id: "defacto-tiktok",
    title: "DeFacto - #HavalıveRahat",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "3.1M İZLENME | 320K BEĞENİ | 17K YORUM",
    image: "https://www.marketingturkiye.com.tr/wp-content/uploads/2020/09/shutterstock_image-82.jpg.webp",
    links: [{ "url": "https://www.tiktok.com/@defacto/video/6875222921502166273", "platform": "", "label": "" }]
  },
  {
    id: "yuga-labs-dragon",
    title: "Yuga Labs - Project Dragon Event",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.2M GÖSTERİM | 12.5K+ BEĞENİ | 2264 OYUNCU",
    image: "https://i.ytimg.com/vi/FIROJqiHWxk/maxresdefault.jpg",
    links: [{ "url": "https://www.yuga.com/", "platform": "", "label": "" }]
  },
  {
    id: "eti-challenges",
    title: "Eti - #eticinlegülümse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "15.4M İZLENME | 685K BEĞENİ | 9K YORUM",
    image: "https://i.ytimg.com/vi/5s7d7No7WsM/maxresdefault.jpg",
    links: [{ "url": "https://www.tiktok.com/@mutlulukdeninceakla/video/6895369042413079810?lang=tr-TR", "platform": "", "label": "" }]
  },
  {
    id: "hp-omen",
    title: "HP Omen - LoL Challenge",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.8M İZLENME | 162K BEĞENİ | 1200 KATILIM",
    image: "https://cdn.imagevisit.com/2026/07/14/509855670_3629034160560724_3729600696970880300_n.jpg",
    links: [{ "url": "https://www.youtube.com/watch?v=R9K1xL2hX9g", "platform": "", "label": "" }]
  },
  {
    id: "metafluence-launch",
    title: "Metafluence Ekosistemi",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "%100 TÜKENDİ | 305 İŞLEM | $50K FON",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800",
    links: [{ "url": "https://metafluence.com/", "platform": "", "label": "" }]
  },
  {
    id: "yuga-labs",
    title: "Yuga Labs",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "AĞU 2024 | APECHAIN ALPHA LANSMANI",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    links: [{ "url": "https://www.yuga.com/", "platform": "", "label": "" }]
  }
];

`;

content = content.substring(0, startIndex) + newWorks + content.substring(endIndex);

fs.writeFileSync('src/data.ts', content);
console.log('Fixed ALL works in data.ts properly');
