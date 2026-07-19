let handler = async (m, { conn }) => {
    try {
        await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 👑 *AUTOPROMOTE*
│
│ ✅ *Estado:* Flor principal asignada
│ 🌷 *El jardín toma el control*
╰───────────────────────╯`)
    } catch (e) {
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR AUTOPROMOTE*
│
│ ⚠️ *No pude convertirme en flor principal*
│ 🌸 *Dame permisos primero*
╰───────────────────────╯`)
    }
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = ['autoadmin']
handler.rowner = true

export default handler