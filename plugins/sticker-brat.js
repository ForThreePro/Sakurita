import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const res = await axios.get('https://kepolu-brat.hf.space/brat', {
            params: { q: text },
            responseType: 'arraybuffer',
            timeout: 15000
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

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `⚡ *Rayo Prem Bot* ⚡\n\n😒 ¿Y el texto, genio?\n\n📌 *Usa:* ${usedPrefix}${command} tu texto aquí\n\n*Ejemplo:* ${usedPrefix}${command} Team Nightwish`,
        }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });

    try {
        const buffer = await fetchSticker(text);
        const stiker = await sticker(buffer, false, 'Team Nightwish', 'Rayo Prem Bot');

        if (stiker) {
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            return conn.sendFile(m.chat, stiker, 'brat.webp', '', m);
        } else {
            throw new Error('No se pudo generar el sticker');
        }
    } catch (err) {
        console.error('[BRAT ERROR]', err);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        return conn.sendMessage(m.chat, {
            text: `💀 *Rayo Prem Bot* \n\nError al generar el sticker:\n${err.message || 'La API está saturada, intenta en 5 seg'}`,
        }, { quoted: m });
    }
};

handler.command = ['brat', 'bratt'];
handler.tags = ['sticker', 'nightwish'];
handler.help = ['brat *<texto>*'];
handler.group = false;
handler.register = false; // pon true si quieres que solo usuarios registrados lo usen

export default handler;