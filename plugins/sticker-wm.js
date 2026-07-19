import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, `🌸 *SAKURITA BOT* ➔ Responde a un *pétalo* para reclamarlo.`, m) 
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return conn.reply(m.chat, `🌸 *SAKURITA BOT* ➔ Eso no es un *pétalo*. Responde a un pétalo.`, m) 
    let img = await m.quoted.download()
    if (!img) return conn.reply(m.chat, `🌷 *SAKURITA BOT* ➔ No pude descargar el *pétalo*.`, m) 
    stiker = await addExif(img, packname || 'Sakurita Bot', author || 'Whois Yallico') 
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '🌸 *Sakurita Bot* | Pétalo reclamado', m) 
    else return conn.reply(m.chat, `🥀 *SAKURITA BOT* ➔ Error al procesar el *pétalo*.`, m) 
  }
}
handler.help = ['wm <nombre>|<autor>']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler