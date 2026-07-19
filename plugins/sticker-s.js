import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/webp|image|video/g.test(mime)) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🎭 *PÉTALO*
│
│ ⚠️ *Responde a una imagen, video o gif*
│ 🌷 *Para convertirlo en pétalo*
╰───────────────────────╯`)

    let img = await q.download()
    let stiker = await sticker(img, false, 'Sakurita Bot', 'Whois Yallico')

    await conn.sendFile(m.chat, stiker, 'sticker.webp', `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *PÉTALO CREADO*
│
│ > *El jardín florece en forma de pétalo*
╰───────────────────────╯`, m)
}

handler.help = ['s']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler