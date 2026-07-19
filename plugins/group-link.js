let handler = async (m, { conn }) => {
    try {
        let link = await conn.groupInviteCode(m.chat)
        let text = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *LINK DEL JARDÍN*
│
│ 🌸 https://chat.whatsapp.com/${link}
│
│ > *“Invita con responsabilidad al jardín”*
╰───────────────────────╯`
        m.reply(text)
    } catch {
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *No pude obtener el link*
│ 🌸 *¿Soy jardinera del grupo?*
╰───────────────────────╯`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup']
handler.group = true
handler.botAdmin = true

export default handler