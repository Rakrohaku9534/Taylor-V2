import fetch from 'node-fetch';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {

    const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw msg;
    
    await conn.reply(m.chat, wait, m);
    
    const url = text.trim();
const doodRegex = /(?:doodstream|dood|dooood|ds2play)(?:.*)\/(?:d\/|e\/)([A-z0-9]+)/;
try {
  const match = url.match(doodRegex);
  if (match) {
    const id = match[1];
    const response = await fetch(`https://api.delivrjs.workers.dev/encrypt/${id}`);
    const { encryptId } = await response.json();
    await m.reply(`*Stream:*\nhttps://xstreampro.pages.dev/play.html?id=${encryptId}&host=doodstream`);
  } else {
    throw new Error('URL tidak cocok dengan regex');
  }
} catch (error) {
  await conn.reply(m.chat, eror, m);
}

};

handler.help = ["xstream *[link]*"];
handler.tags = ["downloader"];
handler.command = /^(xstream)$/i;
export default handler;
