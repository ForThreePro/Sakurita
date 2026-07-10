import { WAMessageStubType } from '@whiskeysockets/baileys'
import { readFileSync } from 'fs'
import { join } from 'path'

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin &&!isOwner) throw "⛈️ *RAYO PREM ERROR* ➔ *Solo los administradores pueden usar este comando.*" // Cambiado

  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  if (/on/i.test(args[0])) {
    chat.bienvenida = true
    await conn.reply(m.chat, "⛈️ *RAYO PREM BIENVENIDA* 🌙\n\n⚡ *Sistema de bienvenida ACTIVADO* en este grupo.", m) // Cambiado
  } else if (/off/i.test(args[0])) {
    chat.bienvenida = false
    await conn.reply(m.chat, "⛈️ *RAYO PREM BIENVENIDA* 🌙\n\n❌ *Sistema de bienvenida DESACTIVADO*.", m) // Cambiado
  } else {
    await conn.reply(m.chat, "⛈️ *RAYO PREM BIENVENIDA* 🌙\n\n📌 *Uso:* *.bienvenida on* / *.bienvenida off*\n🌩️ *Team Nightwish*", m) // Cambiado
  }
}

handler.help = ['bienvenida <on/off>']
handler.tags = ['config']
handler.command = /^(bienvenida|welcome|bye)$/i

handler.before = async function (m, { conn, groupMetadata }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return!0

    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat ||!chat.bienvenida) return!0

    let img
    try {
      img = readFileSync(join(process.cwd(), 'storage', 'img', 'catalogo.png'))
    } catch {
      img = { url: 'https://files.catbox.moe/1j784p.jpg' }
    }

    const userJid = m.messageStubParameters?.[0] || m.participant
    if (!userJid) return!0

    const userTag = `@${userJid.split('@')[0]}`
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'Disfruta tu estadía en el grupo.'
    const membersCount = groupMetadata.participants.length

    let txt = ''

    switch (m.messageStubType) {
      case WAMessageStubType.GROUP_PARTICIPANT_ADD:
        txt = chat.customWelcome? chat.customWelcome.replace(/@user/gi, userTag).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc) :
        `⛈️ *RAYO PREM - NUEVO MIEMBRO* 🌙\n\n` +
        `⚡ *¡ALERTA DE INGRESO!*\n\n` +
        `🌩️ Bienvenido ${userTag} a *${groupName}*\n\n` +
        `📂 *REGISTRO:*\n` +
        `│ 👤 *Miembro:* #${membersCount}\n` +
        `│ 🛠️ *Creador:* Team Nightwish\n` +
        `│ 📝 *Info:* ${groupDesc}\n\n` +
        `> Portaos bien o el trueno los alcanza ⚡`;
        break

      case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
        txt = chat.customBye? chat.customBye.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
        `⛈️ *RAYO PREM - DESPEDIDA* 🌙\n\n` +
        `💨 ${userTag} abandonó *${groupName}*\n\n` +
        `📉 *Quedamos:* ${membersCount} sobrevivientes\n` +
        `> Que te vaya bien, pero vuelve ⚡`;
        break

      case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
        txt = chat.customKick? chat.customKick.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
        `⛈️ *RAYO PREM - EXPULSIÓN* 🌙\n\n` +
        `⚡ *SISTEMA: ACCESO DENEGADO*\n\n` +
        `${userTag} fue eliminado de *${groupName}*\n\n` +
        `🚮 *Causa:* Rompió las reglas\n` +
        `👥 *Población actual:* ${membersCount}\n` +
        `> El trueno no perdona ⚡`;
        break
    }

    if (txt) {
      await conn.sendMessage(m.chat, {
        image: typeof img === 'string'? { url: img } : img,
        caption: txt,
        mentions: [userJid]
      })
    }

  } catch (e) {
    console.error("Error en Bienvenida RAYO:", e)
  }
  return!0
}

export default handler