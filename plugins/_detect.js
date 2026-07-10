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
            txt = `⛈️ *¡ALERTA RAYO PREM!* ⚡🌩️\n\n` +
                  `📢 *¡ATENCIÓN GRUPO!*\n` +
                  `${usuario} *HA CAMBIADO EL NOMBRE* 💥\n\n` +
                  `📝 *Nuevo Nombre:* _${m.messageStubParameters[0]}_\n` +
                  `🌩️ *Lugar:* ${group}\n\n` +
                  `> "El trueno ha hablado" ⚡`; break

        case 22: // Cambiar foto
            txt = `⛈️ *¡RAYO PREM INFORMA!* ⚡📸\n\n` +
                  `🖼️ *¡NUEVA IMAGEN DETECTADA!*\n` +
                  `${usuario} *HA RENOVADO LA FOTO DEL GRUPO* ✨\n\n` +
                  `🌩️ *Grupo:* ${group}\n\n` +
                  `> "Que brille con la fuerza del rayo" ⚡`; break

        case 23: // Cambiar link
            txt = `⛈️ *¡CUIDADO!* ⚡🔗\n\n` +
                  `🚨 *¡LINK RESETEADO!*\n` +
                  `${usuario} *HA CAMBIADO EL ENLACE DEL GRUPO* 💣\n\n` +
                  `🌩️ *Grupo:* ${group}\n\n` +
                  `> "El portal ha sido alterado" ⚡`; break

        case 25: // Cambiar ajustes
            txt = `⛈️ *¡SISTEMA MODIFICADO!* ⚡⚙️\n` +
                  `🔐 *¡CONFIGURACIÓN ALTERADA!*\n` +
                  `${usuario} *HA CAMBIADO LOS PERMISOS* 🛡️\n\n` +
                  `📊 *Estado:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* 🔒' : '*TODOS* 🔓'} pueden editar info\n` +
                  `> "El control está en nuevas manos" ⚡`; break

        case 26: // Abrir/Cerrar
            txt = `⛈️ *¡ESTADO DEL GRUPO!* ⚡🗣️\n\n` +
                  `📢 *¡GRUPO ${m.messageStubParameters[0] == 'on'? 'CERRADO' : 'ABIERTO'}!*\n` +
                  `${usuario} *HA ${m.messageStubParameters[0] == 'on'? 'SELLADO' : 'LIBERADO'} EL CHAT* 🌩️\n\n` +
                  `💬 *Ahora:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* pueden hablar' : '*TODOS* pueden hablar'}\n\n` +
                  `> "Que se escuche el trueno" ⚡`; break

        case 29: // Dar admin
            txt = `⛈️ *¡ASCENSO DIVINO!* ⚡👑\n\n` +
                  `🌟 *¡NUEVO ADMIN EN EL TRONO!*\n` +
                  `@${m.messageStubParameters[0].split('@')[0]} *HA SIDO CORONADO ADMIN* ⚡\n\n` +
                  `⚡ *Por orden de:* ${usuario}\n\n` +
                  `> "Que gobierne con poder" ⚡`; break

        case 30: // Quitar admin
            txt = `⛈️ *¡DESTITUCIÓN!* ⚡📉\n\n` +
                  `💥 *¡ADMIN CAÍDO!*\n` +
                  `@${m.messageStubParameters[0].split('@')[0]} *HA PERDIDO SUS PODERES* 🗑️\n\n` +
                  `⚡ *Por orden de:* ${usuario}\n\n` +
                  `> "El rayo no perdona" ⚡`; break

        case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            txt = `⛈️ *¡NUEVO GUERRERO!* ⚡🌩️\n\n` +
                  `🔥 *¡ALERTA DE INGRESO!*\n` +
                  `@${m.messageStubParameters[0].split('@')[0]} *HA ENTRADO AL GRUPO* 💥\n\n` +
                  `🌩️ *Grupo:* ${group}\n\n` +
                  `> "Bienvenido... o prepárate" ⚡`; break

        case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            txt = `⛈️ *¡BAJA CONFIRMADA!* ⚡💨\n\n` +
                  `😔 *¡ALGUIEN SE FUE!*\n` +
                  `@${m.messageStubParameters[0].split('@')[0]} *HA ABANDONADO EL GRUPO* 🌫️\n\n` +
                  `🌩️ *Grupo:* ${group}\n\n` +
                  `> "Que los vientos lo acompañen" ⚡`; break

        case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
            txt = `⛈️ *¡EXPULSIÓN EJECUTADA!* ⚡🚮\n\n` +
                  `💣 *¡ACCESO DENEGADO!*\n` +
                  `@${m.messageStubParameters[0].split('@')[0]} *HA SIDO ELIMINADO* 🔥\n\n` +
                  `⚡ *Por orden de:* ${usuario}\n\n` +
                  `> "El trueno ha juzgado" ⚡`; break
    }

    if (txt) {
        await this.sendMessage(m.chat, {
            text: txt,
            mentions: [userJid,...(m.messageStubParameters?.[0]? [m.messageStubParameters[0]] : [])]
        })
    }
}

export default handler