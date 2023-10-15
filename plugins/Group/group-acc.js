let handler = async (m, { conn, args, usedPrefix, command }) => {
  const groupId = m.chat;
  switch (command) {
    case "acc":
      const subCommand = args[0];

      switch (subCommand) {
        case "list":
          try {
            const joinRequestList = await conn.groupRequestParticipantsList(groupId);
            if (joinRequestList.length > 0) {
              const formattedList = joinRequestList.map(request => {
                return `*JID:* ${request.jid}\n*Metode Permintaan:* ${request.request_method}\n*Waktu Permintaan:* ${new Date(request.request_time * 1000).toLocaleString()}\n`;
              });
              await m.reply("*Daftar Permintaan Bergabung:*\n" + formattedList.join("\n"));
            } else {
              await m.reply("Tidak ada permintaan bergabung yang tertunda.");
            }
          } catch (error) {
            console.error(error);
            await m.reply("Terjadi kesalahan saat mendapatkan daftar permintaan bergabung.");
          }
          break;
        case "approve":
          const action = args[1];
          const participants = [];

          if (action === "all") {
            try {
              const joinRequestList = await conn.groupRequestParticipantsList(groupId);

              if (joinRequestList.length > 0) {
                const participants = joinRequestList.map(request => request.jid);
                const response = await conn.groupRequestParticipantsUpdate(groupId, participants, "approve");
                const formattedResponse = response.map(res => {
                  return `*Status:* ${res.status}\n*JID:* ${res.jid}\n`;
                });

                await m.reply("Menyetujui Semua Permintaan Bergabung. *Respon:*\n" + formattedResponse.join("\n"));
              } else {
                await m.reply("Tidak ada permintaan bergabung yang tertunda untuk disetujui.");
              }
            } catch (error) {
              console.error(error);
              await m.reply("Terjadi kesalahan saat menyetujui semua permintaan bergabung.");
            }
          } else {
            participants.push(action + '@s.whatsapp.net');
            try {
              const response = await conn.groupRequestParticipantsUpdate(groupId, participants, "approve");
              await m.reply("Menyetujui Permintaan Bergabung. *Respon:*\n" + JSON.stringify(response));
            } catch (error) {
              console.error(error);
              await m.reply("Terjadi kesalahan saat menyetujui permintaan bergabung.");
            }
          }
          break;
        case "reject":
          try {
            const response = await conn.groupRequestParticipantsUpdate(groupId, [], "reject");
            await m.reply("Menolak Permintaan Bergabung. *Respon:*\n" + JSON.stringify(response));
          } catch (error) {
            console.error(error);
            await m.reply("Terjadi kesalahan saat menolak permintaan bergabung.");
          }
          break;
        default:
          await m.reply("Perintah tidak valid. Gunakan 'acc list', 'acc approve number', 'acc approve all', atau 'acc reject'.");
      }
      break;
    default:
      await m.reply("Perintah tidak valid. Gunakan 'acc list', 'acc approve number', 'acc approve all', atau 'acc reject'.");
  }
}

handler.help = ['acc *[option] [all/member]*']
handler.tags = ['group']
handler.command = /^(acc)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
