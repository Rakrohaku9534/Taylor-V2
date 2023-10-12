import { exec } from 'child_process';
import { promisify } from 'util';

let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  // Menunggu pesan "global.wait" sebelum melanjutkan
  await m.reply(global.wait);

  // Memeriksa apakah pengguna adalah pemilik bot
  if (!isROwner) return;

  // Mendapatkan daftar plugin
  const array = Object.keys(plugins);
  const execAsync = promisify(exec);
  const input = text;

  // Validasi input untuk menghindari karakter khusus atau instruksi berbahaya
  if (!/^[a-zA-Z0-9-_.]+$/.test(input)) {
    await m.reply("Input tidak valid. Harap gunakan karakter yang aman.");
    return;
  }

  const index = array.findIndex(item => item.includes(input));

  if (index !== -1) {
    const fileToCat = array[index];
    try {
      const { stdout, stderr } = await execAsync(`rm -rf ${fileToCat}`);
      const output = stdout || stderr;
      await m.reply(output);
    } catch (error) {
      const errorMessage = `Terjadi kesalahan: ${error.message}`;
      await m.reply(errorMessage);
    }
  } else {
    const notFoundMessage = `Input ${input} tidak ditemukan dalam array. Berikut adalah daftar dengan nomor urutan:\n${array.map((item, i) => `${i + 1}. ${item}`).join('\n')}\nContoh penggunaan: Untuk mencari bagian, ketik *.df anti-audio*`;
    await m.reply(notFoundMessage);
  }
}

handler.help = ['dfplugin'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(dfplugin|df)$/i
handler.rowner = true

export default handler
