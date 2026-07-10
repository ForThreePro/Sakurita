import chalk from 'chalk'
import { WAMessageStubType } from '@whiskeysockets/baileys'

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    if (!chat?.detect) return

    const userJid = m.sender
    const usuario = `@${userJid.split('@')[0]}`
    const group = groupMetadata.subject

    let txt = ''

    switch (m.messageStubType) {
        case 21: // Cambiar nombre
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n⚡ ${usuario} *cambió el nombre del grupo*\n\n📝 *Nuevo:* _${m.messageStubParameters[0]}_\n🌩️ *Grupo:* ${group}`; break
        case 22: // Cambiar foto
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n📸 ${usuario} *cambió la foto del grupo*\n\n🌩️ *Grupo:* ${group}`; break
        case 23: // Cambiar link
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n🔗 ${usuario} *restableció el link del grupo*\n\n🌩️ *Grupo:* ${group}`; break
        case 25: // Cambiar ajustes
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n⚙️ ${usuario} *cambió la configuración*\n\n🔒 Ahora *${m.messageStubParameters[0] == 'on'? 'solo admins': 'todos'}* pueden editar info`; break
        case 26: // Abrir/Cerrar
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n🗣️ ${usuario} *${m.messageStubParameters[0] == 'on'? 'cerró': 'abrió'} el grupo*\n\n💬 Ahora *${m.messageStubParameters[0] == 'on'? 'solo admins': 'todos'}* pueden escribir`; break
        case 29: // Dar admin
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n👑 @${m.messageStubParameters[0].split('@')[0]} *ahora es ADMIN*\n\n⚡ *Por:* ${usuario}`; break
        case 30: // Quitar admin
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n📉 @${m.messageStubParameters[0].split('@')[0]} *ya no es ADMIN*\n\n⚡ *Por:* ${usuario}`; break
        case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n🌩️ @${m.messageStubParameters[0].split('@')[0]} *se unió al grupo*\n\n🌩️ *Grupo:* ${group}`; break
        case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n💨 @${m.messageStubParameters[0].split('@')[0]} *salió del grupo*\n\n🌩️ *Grupo:* ${group}`; break
        case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
            txt = `⛈️ *RAYO PREM DETECTOR* 🌙\n\n🚮 @${m.messageStubParameters[0].split('@')[0]} *fue expulsado*\n\n⚡ *Por:* ${usuario}`; break
    }

    if (txt) {
        await this.sendMessage(m.chat, {
            text: txt,
            mentions: [userJid,...(m.messageStubParameters?.[0]? [m.messageStubParameters[0]] : [])]
        })
    }
}

export default handler