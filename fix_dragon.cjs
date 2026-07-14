const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

content = content.replace(
  /id: "yuga-labs-dragon",[\s\S]*?"url": "https:\/\/x.com\/OthersideMeta\/status\/1819071193603101132"/,
  `id: "yuga-labs-dragon",
    title: "Yuga Labs - Project Dragon Event",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.2M IMPRESSIONS | 12.5K+ LIKES | 1980 REPOSTS | 2264 PLAYERS",
    image: "https://i.ytimg.com/vi/FIROJqiHWxk/maxresdefault.jpg",
    links: [
      {
            "url": "https://www.blockchaingamer.biz/news/37394/yuga-labs-otherside-breaks-world-record-2197-players/"`
);

content = content.replace(
  /id: "yuga-labs-dragon",[\s\S]*?"url": "https:\/\/x.com\/OthersideMeta\/status\/1819071193603101132"/,
  `id: "yuga-labs-dragon",
    title: "Yuga Labs - Project Dragon Event",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "1.2M GÖSTERİM | 12.5K+ BEĞENİ | 1980 REPOST | 2264 OYUNCU",
    image: "https://i.ytimg.com/vi/FIROJqiHWxk/maxresdefault.jpg",
    links: [
      {
            "url": "https://www.blockchaingamer.biz/news/37394/yuga-labs-otherside-breaks-world-record-2197-players/"`
);

fs.writeFileSync('src/data.ts', content);
console.log('Fixed dragon correctly');
