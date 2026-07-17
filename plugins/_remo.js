import { Blob } from 'node:buffer';
import { FormData } from 'formdata-node';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw `⚡ *CYBER BOT* 🤖\n\nResponde a una imagen con *${usedPrefix + command}*`;
    if (!/image\/(jpe?g|png)/.test(mime)) {
        throw `⚠️ *ERROR DE SISTEMA*\n\nFormato no soportado. Solo JPG/PNG. Envía la imagen normal`;
    }

    const API_KEY = "FEx4CYmYN1QRQWD1mbZp87jV";

    await m.react('⏳');
    await m.reply('⚡ *Procesando imagen... Eliminando fondo*');

    try {
        let img = await q.download();
        if (!img) throw '❌ No se pudo descargar la imagen';
        if (img.length > 12 * 1024 * 1024) throw '❌ *ARCHIVO DEMASIADO PESADO*\n\nMáximo 12MB permitido';

        let base64Img = img.toString('base64');

        let form = new FormData();
        form.append('image_file_b64', base64Img);
        form.append('size', 'auto');
        // QUITAMOS bg_color porque daba error

        let res = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: form
        });

        if (!res.ok) {
            let errorText = await res.text();
            throw `❌ *ERROR ${res.status}*\n\n${errorText}`;
        }

        let processedImg = await res.buffer();

        await conn.sendFile(
            m.chat,
            processedImg,
            'cyber_bot.png',
            '✨ *FONDO ELIMINADO CON ÉXITO* ✨\n\n⚡ *Procesado por Cyber Bot AI*',
            m
        );

        await m.react('✅');

    } catch (error) {
        console.error('Remove.bg Error:', error);
        await m.reply(`${error}`);
        await m.react('❌');
    }
};

handler.help = ['removebg', 'quitafondo'];
handler.tags = ['tools'];
handler.command = ['removebg', 'quitafondo', 'nobg', 'rmbg'];
handler.register = false;

export default handler;