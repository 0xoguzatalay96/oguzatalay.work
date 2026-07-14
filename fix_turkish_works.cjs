const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The end of ENGLISH_WORKS is the object for "yuga-labs"
const yugaLabsEnStr = `  {
    id: "yuga-labs",
    title: "Yuga Labs / Otherside",
    subtitle: "",
    category: "",
    tags: [],
        kpi: "AUG 2024 | OTHERSIDE ALPHA APECHAIN LAUNCH",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    links: [
      {
            "url": "https://otherside.xyz/",
            "platform": "",
            "label": ""
      }
]
  },`;

const replacement = `  {
    id: "yuga-labs",
    title: "Yuga Labs / Otherside",
    subtitle: "",
    category: "",
    tags: [],
        kpi: "AUG 2024 | OTHERSIDE ALPHA APECHAIN LAUNCH",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    links: [
      {
            "url": "https://otherside.xyz/",
            "platform": "",
            "label": ""
      }
    ]
  }
];

export const TURKISH_WORKS: SelectedWork[] = [
  {
    id: "migros-campaigns",
    title: "Migros - #ReyonSavaşları",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6.7M İZLENME | 3.4M YORUM",
    image: "https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2021/02/23/thumbs_b_c_cb938ae1782baa1b8db45f6905f30112.jpg",
    links: [
      {
            "url": "https://www.youtube.com/watch?v=I8G9adrIyVM",
            "platform": "",
            "label": ""
      }
    ]
  },`;

content = content.replace(yugaLabsEnStr, replacement);
fs.writeFileSync('src/data.ts', content);
console.log('Fixed TURKISH_WORKS export');
