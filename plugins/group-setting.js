let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
    }[(args[0] || '')]

    if (isClose === undefined) {
        await conn.reply(m.chat, `⚡ *CYBER BOT GRUPO* 💻\n\n🤖 *Elija una opción:*\n*${usedPrefix + command}* abrir\n*${usedPrefix + command}* cerrar`, m) // Cambiado
        return
    }

    await conn.groupSettingUpdate(m.chat, isClose)

    // Aviso de la acción realizada
    let estado = isClose === 'announcement'? 'cerrado 🔒' : 'abierto 🔓'
    let emoji = isClose === 'announcement'? '❌' : '✅'
    await conn.reply(m.chat, `${emoji} *CYBER BOT* ➔ Grupo ${estado}\n🤖 *Acción por:* @${m.sender.split('@')[0]}\n💻 *Cyber Bot System*`, m, { // Cambiado
        mentions: [m.sender]
    })
}

handler.help = ['grupo abrir', 'grupo cerrar']
handler.tags = ['grupos']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler