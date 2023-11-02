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
    if (!tema) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]")

    await m.reply(wait)
    if (command === "googleimg") {
        try {
            const param = {
                api_key: 'd52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562',
                engine: 'google_images',
                q: tema,
                hl: 'id',
                gl: 'ID'
            };
            let all = await generateSerpApiUrl(param)
            let data = all.images_results
            if (!urutan) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            if (urutan > data.length) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            let out = data[urutan - 1]
            let caption = `🔍 *[ HASIL ]*

- *title:* ${out.title || 'Tidak ada'}
- *link:* ${out.link || 'Tidak ada'}`;

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
    if (command === "googlevid") {
        try {
            const param = {
                api_key: 'd52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562',
                engine: 'google_videos',
                q: tema,
                hl: 'id',
                gl: 'ID'
            };
            let all = await generateSerpApiUrl(param)
            let data = all.video_results
            if (!urutan) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            if (urutan > data.length) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [query]|[nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
            let out = data[urutan - 1]
            let caption = `🔍 *[ HASIL ]*

- *title:* ${out.title || 'Tidak ada'}
- *link:* ${out.link || 'Tidak ada'}
- *date:* ${out.date || 'Tidak ada'}
- *snippet:* ${out.snippet || 'Tidak ada'}
- *duration:* ${out.duration || 'Tidak ada'}`;

            await conn.sendMessage(m.chat, {
                video: {
                    url: out.video_link || out.thumbnail
                },
                caption: caption
            }, {
                quoted: m
            })
        } catch (e) {
            await m.reply(eror)
        }
    }
}
handler.help = ["google *[img/vid query]*"]
handler.tags = ["search"]
handler.command = /^google(img|vid)?$/i
export default handler