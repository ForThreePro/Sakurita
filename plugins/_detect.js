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
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *REGISTRO DEL JARDÍN*
│
│ 📢 *NOMBRE CAMBIADO*
│ 👤 *Jardinero:* ${usuario}
│ 📝 *Nuevo:* _${m.messageStubParameters[0]}_
│ 💮 *Grupo:* ${group}
│
│ > *“El jardín florece con nuevo nombre”* 🌸
╰───────────────────────╯`; break

        case 22: // Cambiar foto
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *REGISTRO DEL JARDÍN*
│
│ 📸 *FOTO CAMBIADA*
│ 👤 *Jardinero:* ${usuario}
│ 🖼️ *Nueva imagen establecida*
│ 💮 *Grupo:* ${group}
│
│ > *“El jardín se viste de nuevos pétalos”* 🌷
╰───────────────────────╯`; break

        case 23: // Cambiar link
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🛡️ *CUIDADO DEL JARDÍN*
│
│ 🔗 *LINK RESETEADO*
│ 👤 *Jardinero:* ${usuario}
│ 💮 *Grupo:* ${group}
│
│ > *“El acceso al jardín fue renovado”* 🌸
╰───────────────────────╯`; break

        case 25: // Cambiar ajustes
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🛡️ *AJUSTES DEL JARDÍN*
│
│ 👤 *Jardinero:* ${usuario}
│ ⚙️ *Permisos:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* 🔒' : '*TODOS* 🔓'}
│ 📊 *Edición de info de grupo*
│
│ > *“Reglas del jardín actualizadas”* 🌷
╰───────────────────────╯`; break

        case 26: // Abrir/Cerrar
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 💮 *ESTADO DEL JARDÍN*
│
│ 👤 *Jardinero:* ${usuario}
│ 🗣️ *Modo:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* 🔒' : '*TODOS* 🔓'}
│ 📢 *Grupo:* ${m.messageStubParameters[0] == 'on'? 'CERRADO' : 'ABIERTO'}
│
│ > *“Las puertas del jardín fueron actualizadas”* 🌸
╰───────────────────────╯`; break

        case 29: // Dar admin
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 👑 *NUEVO CUIDADOR*
│
│ 🌷 *Nuevo Admin:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Nombrado por:* ${usuario}
│ 💮 *Rango:* Administrador
│
│ > *“Nuevo cuidador del jardín asignado”* 🌸
╰───────────────────────╯`; break

        case 30: // Quitar admin
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *RANGO REVOCADO*
│
│ 💥 *Admin removido:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Ejecutado por:* ${usuario}
│ 🗑️ *Permisos eliminados*
│
│ > *“Cuidador removido del jardín”* 🌷
╰───────────────────────╯`; break

        case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 💮 *NUEVA FLOR EN EL JARDÍN*
│
│ 🌷 *Bienvenido:* @${m.messageStubParameters[0].split('@')[0]}
│ 💮 *Jardín:* ${group}
│ 🌸 *Estado:* Pétalo sembrado
│
│ > *“Un nuevo pétalo florece aquí”* 🌷
╰───────────────────────╯`; break

        case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *PÉTALO MARCHITO*
│
│ 😔 *Se fue:* @${m.messageStubParameters[0].split('@')[0]}
│ 💮 *Jardín:* ${group}
│ 🌫️ *Estado:* Abandonó el jardín
│
│ > *“Un pétalo se desprendió”* 🌸
╰───────────────────────╯`; break

        case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
            txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🚮 *PÉTALO PODADO*
│
│ 💥 *Eliminado:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Por orden de:* ${usuario}
│ 🌷 *Causa:* No cuidó el jardín
│
│ > *“Protocolo de poda aplicado”* 🌸
╰───────────────────────╯`; break
    }

    if (txt) {
        await this.sendMessage(m.chat, {
            text: txt,
            mentions: [userJid,...(m.messageStubParameters?.[0]? [m.messageStubParameters[0]] : [])]
        })
    }
}

export default handler