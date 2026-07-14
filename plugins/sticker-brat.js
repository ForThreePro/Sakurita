import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const res = await axios.get('https://kepolu-brat.hf.space/brat', {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (err) {
        if (err.response?.status === 429 && attempt <= 3) {
            const retryAfter = err.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw err;
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `😒 ¿Y el texto, genio? No puedo hacer magia sin palabras.\n\n📌 *Usa:* .brat tu texto aquí`,
        }, { quoted: m });
    }

    try {
        const buffer = await fetchSticker(text);
        const stiker = await sticker(buffer, false, global.botname, global.nombre);

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'brat.webp', '', m);
        } else {
            throw new Error('No se pudo generar el sticker. ¿Qué texto tan feo pusiste? 🤨');
        }
    } catch (err) {
        console.error(err);
        return conn.sendMessage(m.chat, {
            text: `💀 Error al generar el sticker:\n${err.message || 'Algo salió mal, como tú.'}`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;