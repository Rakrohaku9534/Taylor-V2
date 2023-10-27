export async function before(m) {
    if (m.isBaileys || !m.text) return false;
const cleanupInterval = 60 * 60 * 1000;
const cleanup = async () => {
  try {
    const chatIdsToDelete = Object.values(conn.chats).filter(item => /@g\.us$/.test(item.id)).map(item => item.id);
    const deletedGroupCount = chatIdsToDelete.length;
    for (const id of chatIdsToDelete) {
      await conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, id);
      console.log(`Grup dihapus: ${id}`);
    }
    console.log(`Pembersihan berhasil. Jumlah grup yang dihapus: ${deletedGroupCount}`);
  } catch (error) {
    console.error(error);
  }
};

setInterval(() => {
  cleanup();
}, cleanupInterval);
}

export const disabled = false;