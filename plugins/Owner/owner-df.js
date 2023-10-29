import { exec } from 'child_process';
import { promisify } from 'util';

// Daftar plugin yang diberikan
const pluginsList = Object.keys(global.plugins);

let handler = async (m, { conn, command, args }) => {
        if (args.length === 0) {
            // Menampilkan list kategori
            const pluginCategories = [...new Set(pluginsList.map(plugin => plugin.split('/')[2]))];
            const pluginList = pluginCategories.map((category, index) => `${index + 1}. *${category}*`).join('\n');
            await m.reply(`*List Kategori:*\n${pluginList}`);
        } else if (args.length === 1) {
            // Menampilkan list file dalam kategori tertentu
            const categoryIndex = parseInt(args[0]) - 1;
            const pluginCategories = [...new Set(pluginsList.map(plugin => plugin.split('/')[2]))];

            if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < pluginCategories.length) {
                const selectedCategory = pluginCategories[categoryIndex];
                const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);
                const pluginList = pluginNames.map((plugin, index) => `${index + 1}. *${plugin.split('/').pop().replace('.js', '')}*`).join('\n');
                await m.reply(`*List File dalam Kategori "${selectedCategory}":*\n${pluginList}`);
            } else {
                await m.reply('*Input salah* atau angka di luar rentang yang sesuai.');
            }
        } else if (args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
            // Menjalankan operasi sesuai dengan format "df 1 2"
            const categoryIndex = parseInt(args[0]);
            const pluginIndex = parseInt(args[1]);
            const pluginCategories = [...new Set(pluginsList.map(plugin => plugin.split('/')[2]))];

            if (categoryIndex >= 1 && categoryIndex <= pluginCategories.length) {
                const selectedCategory = pluginCategories[categoryIndex - 1];
                const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);

                if (pluginIndex >= 1 && pluginIndex <= pluginNames.length) {
                    const selectedPlugin = pluginNames[pluginIndex - 1];
                    const commandToExecute = `rm -rf '${selectedPlugin}'`;

                    const execPromise = promisify(exec);
                    try {
                        const { stdout, stderr } = await execPromise(commandToExecute);
                        await m.reply(`*Sukses deleted*\n${selectedPlugin}\n${stdout}`);
                    } catch (error) {
                        await m.reply(`*Error:* ${error.message}`);
                    }
                } else {
                    await m.reply('*Indeks plugin salah* atau di luar rentang yang sesuai.');
                }
            } else {
                await m.reply('*Indeks kategori salah* atau di luar rentang yang sesuai.');
            }
        } else {
            await m.reply('*Format perintah tidak valid.* Gunakan "df" untuk menampilkan list kategori, "df 1" untuk menampilkan list file dalam kategori, atau "df 1 2" untuk menjalankan operasi tertentu.');
        }
    }

handler.help = ['df'].map(v => v + ' *index*')
handler.tags = ['owner']
handler.command = /^(df)$/i
handler.rowner = true

export default handler
