const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

dataContent = dataContent.replace(
  'Executed critical community operations for the adidas Originals\' "Into the Metaverse" Web3 initiative, which officially launched on December 17, 2021. Championed a community-driven strategy that successfully capitalized on the growing mainstream interest in blockchain technologies. Supported structured token distribution through public sales, enhancing the realizable value for the brand through increased legitimacy, loyalty, and prestige.',
  `Managed community sentiment and intelligence reporting during the ecosystem migration to the 'ALTS by adidas' dynamic NFT collection, a project that sustained a floor price of ~0.59 ETH and drove over $600K in initial secondary volume.`
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Fixed adidas EN');
