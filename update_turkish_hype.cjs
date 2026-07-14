const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Turkish fixes
data = data.replace(
  /patlayıcı influencer büyüme stratejisine/,
  'hızlandırılmış büyüme stratejisine'
);
data = data.replace(
  /sıkı müzakereler/,
  'karmaşık sözleşme müzakereleri'
);
data = data.replace(
  /lansmandan sonraki 48 saat içinde 3,8 milyondan fazla izlenme ve 450 binden fazla organik etkileşim yaratarak rekor kırma\./,
  'kritik 48 saatlik lansman sürecinde 3,8 milyondan fazla izlenme ve 450 binden fazla organik etkileşim yaratarak tarihsel metrikleri aşma.'
);
data = data.replace(
  /efsanevi kampanyalar/,
  'amiral gemisi kampanyalar'
);
data = data.replace(
  /devasa ölçekli/,
  'kapsamlı ölçekli'
);
data = data.replace(
  /devasa kullanıcı edinimi/,
  'yüksek hacimli kullanıcı edinimi'
);
data = data.replace(
  /devasa, çok kanallı/,
  'büyük ölçekli, çok kanallı'
);
data = data.replace(
  /devasa tam döngülü/,
  'kapsamlı tam döngülü'
);
data = data.replace(
  /devasa topluluk heyecanı yaratma/,
  'yüksek erişimli topluluk etkileşimi yaratma'
);
data = data.replace(
  /devasa fiziksel ve dijital entegre etkinlikleri/,
  'büyük ölçekli fiziksel ve dijital entegre etkinlikleri'
);
data = data.replace(
  /devasa donanım lansmanlarını/,
  'yüksek erişimli donanım lansmanlarını'
);

// We need to check if there are other rekor words
data = data.replace(
  /rekor kalabalıklar toplama/,
  'yüksek katılımlı kitleler toplama'
);

data = data.replace(
  /rekor hızda/,
  'çevik bir şekilde'
);

fs.writeFileSync('src/data.ts', data);
console.log('Update completed for Turkish hype words!');
