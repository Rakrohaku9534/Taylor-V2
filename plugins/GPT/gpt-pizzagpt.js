import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .pizzagpt hello")
await m.reply(wait)
try {

const messages = [
  { role: 'user', content: text },
  { role: 'assistant', content: 'Saya baik, terima kasih. Ada yang bisa saya bantu?' }
];

  const result = await pizzaGpt(messages);
  await m.reply(result);
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["pizzagpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(pizzagpt)$/i
export default handler

/* New Line */
 async function pizzaGpt(messages) {
const headers = {
  'Origin': 'https://pizzagpt.it',
  'Referer': 'https://pizzagpt.it/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'X-Secret': 'Marinara',
  'Content-Type': 'text/plain;charset=UTF-8',
  'Cookie': 'dntd=false; cf_clearance=r4xzN9B6NS2nW5gq2Q1YOgiYw1zu3xs81FmZyNjSVBg-1690797483-0-0.2.1690797483; n-req=1'
};
  let conversation = 'This is a conversation between a human and a language model. The language model should always respond as the assistant, referring to the past history of messages if needed.\n';

  for (const message of messages) {
    conversation += `${message.role}: ${message.content}\n`;
  }

  conversation += 'assistant: ';
  const jsonData = {
    question: conversation
  };

  const response = await axios.post('https://pizzagpt.it/api/chat-completion', jsonData, {
    headers: headers,
    impersonate: 'chrome110'
  });

  return response.data.answer.content;
}