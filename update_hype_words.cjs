const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// 1. Hype Words to Corporate Tone
data = data.replace(
  /aggressively onboarded/,
  'strategically onboarded'
);
data = data.replace(
  /explosive Turkish influencer growth strategy/,
  'accelerated growth strategy'
);
data = data.replace(
  /fierce negotiations/,
  'complex contract negotiations'
);
data = data.replace(
  /Smashed records by generating/,
  'Exceeded historical benchmarks by generating'
);
data = data.replace(
  /explosive 48-hour launch window/,
  'critical 48-hour launch window'
);
data = data.replace(
  /executing legendary campaigns/,
  'executing flagship campaigns'
);

// 2. Replace "massive" instances
data = data.replace(
  /massive user acquisition funnels/,
  'high-volume user acquisition funnels'
);
data = data.replace(
  /Directed massive, multi-channel campaigns/,
  'Directed large-scale, multi-channel campaigns'
);
data = data.replace(
  /Orchestrated massive full-cycle creator campaigns/,
  'Orchestrated comprehensive full-cycle creator campaigns'
);
data = data.replace(
  /driving massive community hype/,
  'driving high-reach community engagement'
);
data = data.replace(
  /landing massive national press coverage/,
  'landing comprehensive national press coverage'
);
data = data.replace(
  /Orchestrated massive physical-to-digital events/,
  'Orchestrated large-scale physical-to-digital events'
);
data = data.replace(
  /20-influencer massive hardware launches/,
  '20-influencer high-reach hardware launches'
);

fs.writeFileSync('src/data.ts', data);
console.log('Update completed!');
