const fs = require('fs');

let content = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

content = content.replace(
  '<div className="absolute top-3 left-3 z-20 font-mono text-[9px] text-white/50 bg-[#131313]/80 px-2 py-1 border border-[#2a2a2a] uppercase tracking-wider backdrop-blur-sm">\n                        LOC: {work.id.substring(0, 3).toUpperCase()} // X: {cardCoords.x} Y: {cardCoords.y}\n                      </div>',
  `<div className="absolute top-3 left-3 z-20 font-mono text-[10px] text-white/90 bg-black/60 px-2 py-1.5 border border-white/10 uppercase tracking-wider backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/50 group-hover:text-[#FF4444]">
                        {work.kpi ? work.kpi : \`LOC: \${work.id.substring(0, 3).toUpperCase()} // X: \${cardCoords.x} Y: \${cardCoords.y}\`}
                      </div>`
);

fs.writeFileSync('src/components/SelectedWorks.tsx', content);
console.log('SelectedWorks.tsx updated');
