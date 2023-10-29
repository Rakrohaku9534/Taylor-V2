import fetch from 'node-fetch'
const {
    generateSerpApiUrl
} = await (await import('../../lib/serpapi.js'));

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    try {
        let text
        if (args.length >= 1) {
            text = args.slice(0).join(" ")
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text
        } else throw "Input teks atau reply teks yang ingin dicari!"

        await m.reply(wait)

        if (command === "yandex") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yandex',
                text: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.organic_results.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.link || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
            await conn.reply(m.chat, caption, m)
        }
        if (command === "yandeximg") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yandex_images',
                text: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.images_results[0]
            await conn.sendMessage(m.chat, {
                image: {
                    url: caption.original || caption.thumbnail
                },
                caption: `- ${caption.title}\n- ${caption.snippet}\n- ${caption.source}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        }
        if (command === "yandexvid") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yandex_videos',
                text: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.videos_results[0]
            await conn.sendMessage(m.chat, {
                video: {
                    url: caption.preview.url || caption.thumbnail
                },
                caption: `- ${caption.title}\n- ${caption.description}\n- ${caption.duration}\n- ${caption.source}\n- ${caption.date}\n- ${caption.views}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        }
    } catch (error) {
        console.error(error);
        // Handle the error, e.g., send an error message to the user
    }
}
handler.help = ["yandex *[img/vid query]*"]
handler.tags = ["search"]
handler.command = /^yandex(img|vid)?$/i
export default handler
