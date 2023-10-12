const {
    generateSerpApiUrl
} = await (await import('../../lib/serpapi.js'));

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let [tema, urutan] = text.split(/[^\w\s]/g)
    if (!tema) return m.reply("Input query!\n*Example:*\n.image2 [query]|[nomor]")

    await m.reply(wait)
    try {
        const param = {
            api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
            engine: 'google_images',
            q: tema
        };
        let all = await generateSerpApiUrl(param)
        let data = all.images_results
        if (!urutan) return m.reply("Input query!\n*Example:*\n.image2 [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.image2 [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.image2 [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1]
        let caption = `🔍 *[ HASIL ]*

📋 *Deskripsi:* ${out.title || 'Tidak ada'}
📍 *Link:* ${out.link || 'Tidak ada'}
📝 *Source:* ${out.source || 'Tidak ada'}`;

        await conn.sendMessage(m.chat, {
                image: {
                    url: out.original || out.thumbnail
                },
                caption: caption
            }, {
                quoted: m
            })
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["image2 *[query]|[nomor]*"]
handler.tags = ["search"]
handler.command = /^(g?image2)$/i
export default handler