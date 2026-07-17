const linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
    if (!isAdmin &&!isOwner) throw `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🛡️ *ACCESO DENEGADO*
│ Solo *ADMINS* pueden usar esto
╰─────────────────❒`

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}

    if (/on/i.test(args[0])) {
        chat.antiLink = true
        await conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *ANTI-LINK ACTIVADO*
│
│ 🤖 *Estado:* ENCENDIDO
│ 🛡️ *Bloqueo:* Grupos + Canales
│ ⚡ *El sistema vigila el grupo*
╰─────────────────❒`, m)
    } else if (/off/i.test(args[0])) {
        chat.antiLink = false
        await conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *ANTI-LINK DESACTIVADO*
│
│ 🤖 *Estado:* APAGADO
│ ✅ *Ya se pueden enviar links*
╰─────────────────❒`, m)
    } else {
        await conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💻 *PANEL ANTI-LINK*
│
│ 📌 *Uso:*.antilink on /.antilink off
│ ⚡ *Función:* Bloquea links externos
│ 🛡️ *Protege:* Spam de grupos y canales
│
│ 🤖 *Mantén seguro el sistema*
╰─────────────────❒`, m)
    }
}

handler.help = ['antilink <on/off>']
handler.tags = ['config']
handler.command = /^(antilink|antilinks)$/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return!0
    const botNumber = conn.user.jid
    if (m.sender === botNumber || m.fromMe || m.isBaileys) return!0

    const chat = global.db.data.chats[m.chat]
    if (!chat?.antiLink) return!0

    const isGroupLink = linkRegex.exec(m.text)
    const isChannelLink = channelLinkRegex.exec(m.text)

    if ((isGroupLink || isChannelLink) &&!isAdmin) {
        if (!isBotAdmin) return!0

        // Permite el link del propio grupo
        if (isGroupLink) {
            const groupCode = await conn.groupInviteCode(m.chat).catch(() => null)
            if (groupCode && m.text.includes(groupCode)) return!0
        }

        await conn.sendMessage(m.chat, { delete: m.key })
        await conn.reply(
            m.chat,
            `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚠️ *¡ENLACE NO AUTORIZADO!*
│
│ 🚮 *Usuario:* @${m.sender.split('@')[0]}
│ ⚡ *Motivo:* Enviar link externo
│ 🛡️ *Acción:* Expulsado del sistema
│
│ > *Regla:* Prohibido el spam 🤖*
╰─────────────────❒`,
            m,
            { mentions: [m.sender] }
        )
        return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    return!0
}

export default handler