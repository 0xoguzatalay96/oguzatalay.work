const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// 1. Yuga Labs
dataContent = dataContent.replace(
  `Directed high-stakes creator partnerships and ecosystem intelligence for one of the most prominent Web3 metaverses, accelerating community growth and strategic alignment.`,
  `Played a key operational role during the highly anticipated Otherside Alpha launch on ApeChain (August 2024), monitoring community reaction and driving X/Discord engagement strategies.`
);

dataContent = dataContent.replace(
  `Dünyanın en prestijli Web3 metaverse projelerinden birinde yüksek riskli içerik üreticisi ortaklıklarını ve ekosistem istihbaratını yöneterek topluluk büyümesine ivme kazandırma.`,
  `Ağustos 2024'teki merakla beklenen Otherside Alpha'nın ApeChain üzerindeki lansmanında kritik bir operasyonel rol üstlenerek topluluk tepkilerini izleme ve X/Discord etkileşim stratejilerini yönetme.`
);

// 2. adidas
dataContent = dataContent.replace(
  `Executed critical community operations for the adidas Originals' "Into the Metaverse" Web3 initiative, which officially launched on December 17, 2021. Championed a community-driven strategy that successfully capitalized on the growing mainstream interest in blockchain technologies. Supported structured token distribution through public sales, enhancing the realizable value for the brand through increased legitimacy, loyalty, and prestige.`,
  `Managed community sentiment and intelligence reporting during the ecosystem migration to the 'ALTS by adidas' dynamic NFT collection, a project that sustained a floor price of ~0.59 ETH and drove over $600K in initial secondary volume.`
);

dataContent = dataContent.replace(
  `Pioneered complex regional digital-to-physical (D2P) fulfillment strategies to support the project's hybrid model of blending digital exclusivity with physical rewards. Successfully bridged the gap between blockchain token redemption and the logistics of shipping physical streetwear, such as limited-edition hoodies, yellow tracksuits, and orange beanies. Enabled token holders to seamlessly claim physical items while unlocking corresponding virtual apparel for avatars in The Sandbox metaverse.`,
  `Supported D2P (Digital-to-Physical) fulfillment logistics for the MENA and Türkiye regions, resolving customs and international shipping bottlenecks for Phase 2 physical merchandise claims.`
);

dataContent = dataContent.replace(
  `17 Aralık 2021'de resmi olarak başlatılan adidas Originals'ın 'Into the Metaverse' Web3 girişimi için kritik topluluk operasyonlarını yürüttü. Blokzincir teknolojilerine yönelik artan ana akım ilgisini başarıyla sermayeye dönüştüren topluluk odaklı bir stratejiye öncülük etti. Halka açık satışlar yoluyla yapılandırılmış token dağıtımını destekleyerek artan meşruiyet, sadakat ve prestij yoluyla marka için gerçekleşebilir değeri artırdı.`,
  `'ALTS by adidas' dinamik NFT koleksiyonuna ekosistem geçişi sırasında topluluk duyarlılığını ve istihbarat raporlamasını yönetti. Bu geçiş süreci, ~0.59 ETH taban fiyatını koruyan ve başlangıçta 600 Bin Doların üzerinde ikincil piyasa hacmi yaratan bir projedir.`
);

dataContent = dataContent.replace(
  `Projenin dijital seçkinliği fiziksel ödüllerle harmanlayan hibrit modelini desteklemek için karmaşık bölgesel dijitalden fiziksele (D2P) yerine getirme stratejilerine öncülük etti. Blokzincir token itfası ile sınırlı sayıdaki kapüşonlular, sarı eşofmanlar ve turuncu bereler gibi fiziksel sokak kıyafetlerinin nakliye lojistiği arasındaki uçurumu başarıyla kapattı. Token sahiplerinin fiziksel öğeleri sorunsuzca talep etmelerini sağlarken The Sandbox metaverse'ünde avatarlar için karşılık gelen sanal kıyafetlerin kilidini açtı.`,
  `MENA ve Türkiye bölgeleri için D2P (Dijitalden Fiziksele) ürün tedarik lojistiğini destekleyerek, Phase 2 fiziksel ürün taleplerinde gümrük ve uluslararası nakliye darboğazlarını çözdü.`
);

// 3. Metafluence
dataContent = dataContent.replace(
  `Architected a massive TIBIT private-sale influencer activation. Generated unprecedented FOMO resulting in a 100% sold-out round, over 305 transactions, and $50K+ raised in record time.`,
  `Directed a rapid-growth influencer strategy during the platform's critical post-IDO expansion phase (Q2/Q3 2022), securing a 100% sold-out TIBIT private-sale that generated 305 transactions and raised $50K USD.`
);

dataContent = dataContent.replace(
  `Devasa bir TIBIT özel satış influencer aktivasyonu tasarlama; eşi benzeri görülmemiş bir FOMO yaratarak %100 kapalı gişe bir tur, 305'ten fazla işlem ve rekor sürede 50.000$+ fon toplama başarısı.`,
  `Platformun kritik IDO sonrası genişleme evresinde (2022 2. ve 3. çeyrek) hızlı büyüme odaklı influencer stratejisini yöneterek; 305 işlemle sonuçlanan ve 50.000 ABD Doları fon toplayan %100 kapalı gişe TIBIT özel satışını sağlama.`
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Experiences updated.');
