const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const updates = [
  {
    id: "migros-campaigns",
    newImage: "https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2021/02/23/thumbs_b_c_cb938ae1782baa1b8db45f6905f30112.jpg"
  },
  {
    id: "adidas-originals",
    newImage: "https://i.ytimg.com/vi/EVQ6fPrwi0M/maxresdefault.jpg"
  },
  {
    id: "koton",
    newImage: "https://i.ytimg.com/vi/mqi0DQ8OnWs/maxresdefault.jpg"
  },
  {
    id: "defacto-tiktok",
    newImage: "https://www.marketingturkiye.com.tr/wp-content/uploads/2020/09/shutterstock_image-82.jpg.webp"
  },
  {
    id: "redbull-events",
    newImage: "https://img.redbull.com/images/c_crop,w_6291,h_3146,x_0,y_0/c_auto,w_1200,h_600/f_auto,q_auto/redbullcom/2020/1/30/zz4ny7x92bs3gqthtgxl/gist-2020"
  },
  {
    id: "yuga-labs-dragon",
    newImage: "https://i.ytimg.com/vi/FIROJqiHWxk/maxresdefault.jpg"
  },
  {
    id: "eti-challenges",
    newImage: "https://i.ytimg.com/vi/5s7d7No7WsM/maxresdefault.jpg"
  },
  {
    id: "hp-omen",
    newImage: "https://cdn.imagevisit.com/2026/07/14/509855670_3629034160560724_3729600696970880300_n.jpg"
  }
];

updates.forEach(update => {
  const regex = new RegExp(`(id:\\s*"${update.id}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
  dataContent = dataContent.replace(regex, `$1${update.newImage}$2`);
});

fs.writeFileSync('src/data.ts', dataContent);
console.log('Images updated successfully');
