const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

dataContent = dataContent.replace(
  'ÜST DÜZEY YETENEK KEŞFİ, KAZANIMI VE AGRESİF ERİŞİM STRATEJİLERİ',
  'ÜST DÜZEY YETENEK KEŞFİ VE HEDEF ODAKLI YETENEK KAZANIMI'
);

dataContent = dataContent.replace(
  'WEB3 INFLUENCER TOHUMLAMASI VE ÖZEL SATIŞ (ICO/IDO) FOMO YARATIMI',
  'WEB3 INFLUENCER TOHUMLAMASI VE ÖZEL SATIŞ (ICO/IDO) YÜKSEK TALEPLİ KAMPANYA YÖNETİMİ'
);

dataContent = dataContent.replace(
  'YENİ TEKNOLOJİLERİ VE YAPAY ZEKA ARAÇLARINI REKOR HIZDA ÖĞRENME',
  'YENİ TEKNOLOJİLERİN VE YAPAY ZEKA ARAÇLARININ ÇEVİK ENTEGRASYONU'
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('TR texts updated');
