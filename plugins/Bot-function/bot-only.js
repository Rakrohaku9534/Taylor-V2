export async function before(m) {
    const chat = global.db.data.chats[m.chat];
    if (m.isBaileys || !m.text) return false;
    
    if (chat.gconly && !m.chat.endsWith("g.us")) {
        chat.pconly = false;
        chat.isBanned = true;
    } else {
        chat.isBanned = false;
    }
    
    if (chat.pconly && m.chat.endsWith("g.us")) {
        chat.gconly = false;
        chat.isBanned = true;
    } else {
        chat.isBanned = false;
    }
}

export const disabled = false;