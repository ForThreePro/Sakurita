let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `⛈️ *RAYO PREM DELETE* 🌙\n\n⚡ Responde al mensaje que deseas eliminar.`, m) // Cambiado
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
conn.reply(m.chat, `🌩️ *RAYO PREM* ➔ Mensaje eliminado\n⚡ *Acción por:* @${m.sender.split('@')[0]}\n🌙 *Team Nightwish*`, m, { mentions: [m.sender] }) // Cambiado
 } catch {
await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
conn.reply(m.chat, `🌩️ *RAYO PREM* ➔ Mensaje eliminado\n⚡ *Acción por:* @${m.sender.split('@')[0]}\n🌙 *Team Nightwish*`, m, { mentions: [m.sender] }) // Cambiado
}
handler.help = ['delete']
handler.tags = ['grupos']
handler.command = /^del(ete)?$/i
handler.admin = true
handler.botAdmin = true

export default handler