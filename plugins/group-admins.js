const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *CONTROL DEL JARDÍN*
│
│ 🌸 *Menciona o responde al pétalo*
│ 🌷 *para ${command === 'promote' || command === 'promover' || command === 'daradmin'? 'promover' : 'degradar'} como jardinero*
╰───────────────────────╯`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = /^(promote|promover|daradmin)$/i.test(command)? 'promote' : 'demote'

  let msgAccion = action === 'promote'
 ? `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *PROMOCIÓN DE PÉTALO*
│
│ 👑 *@${user.split('@')[0]} ahora es Jardinero*
│ 🌸 *Acción por:* @${m.sender.split('@')[0]}
│
│ > *“Permisos florecidos por el jardín”*
╰───────────────────────╯`
    : `🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *PODADO DE PÉTALO*
│
│ 🌫️ *@${user.split('@')[0]} ya no es Jardinero*
│ 🌸 *Acción por:* @${m.sender.split('@')[0]}
│
│ > *“Permisos marchitados por el jardín”*
╰───────────────────────╯`

  await conn.groupParticipantsUpdate(m.chat, [user], action)
  m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })
}

handler.help = ['promote', 'demote']
handler.tags = ['grupos']
handler.command = /^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler