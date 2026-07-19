let handler = async (m, { conn, args, text, isOwner }) => {
    // Solo el owner puede usarlo
    if (!isOwner) return m.reply('🌸 *ACCESO DENEGADO*\n\nSolo el creador del jardín puede usar este comando')

    if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 💮 *MÓDULO DE CONEXIÓN*
│
│ 🌷 *Uso:*.join https://chat.whatsapp.com/xxxxx
│ 🌸 *Función:* Unirme a un jardín
│
│ *Envíame el link del grupo y florezco ahí*
╰───────────────────────╯`)

    let link = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!link) return m.reply('🥀 *ERROR*\n\nLink inválido. Envíame un link de WhatsApp válido')

    let res = await conn.groupAcceptInvite(link[1]).catch(e => {
        console.log(e)
        return m.reply('🥀 *ERROR DE CONEXIÓN*\n\nNo pude unirme. Puede que ya esté en el jardín o el link expiró')
    })

    if (res) {
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *CONEXIÓN EXITOSA*
│
│ 🌷 *Estado:* Pétalo sembrado en el jardín
│ 💮 *ID del Grupo:* ${res}
│ 🌸 *Sakurita Bot online*
╰───────────────────────╯`)
    }
}
handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'unirbot']
handler.owner = true

export default handler