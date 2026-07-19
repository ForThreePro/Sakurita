const userSpamData = {}

let handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return global.dfail('owner', m, conn)
  let bot = global.db.data.settings[conn.user.jid] || {}

  if (/on/i.test(args[0])) {
    bot.antiSpam = true
    await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *JARDÍN PROTEGIDO*
│
│ 🌸 *Estado:* ACTIVO
│ 🌷 *Filtro:* Stickers + Emojis
│ 🌸 *Los pétalos cuidan el flood*
╰───────────────────────╯`, m)
  } else if (/off/i.test(args[0])) {
    bot.antiSpam = false
    await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *JARDÍN LIBERADO*
│
│ 🌸 *Estado:* DESACTIVADO
│ ✅ *Se permiten stickers y emojis*
╰───────────────────────╯`, m)
  } else {
    await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 💮 *PANEL DEL JARDÍN*
│
│ 📌 *Uso:*.antispam on /.antispam off
│ 🌷 *Función:* Anti flood de stickers/emojis
│ 🛡️ *Límite:* 4 avisos | 6 expulsión
│
│ 🌸 *Mantén florecido tu jardín*
╰───────────────────────╯`, m)
  }
}

handler.help = ['antispam on/off']
handler.tags = ['config']
handler.command = /^(antispam)$/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}

  if (!bot.antiSpam || m.fromMe) return

  const sender = m.sender
  const currentTime = Date.now()
  const timeWindow = 6000
  const warnLimit = 4
  const kickLimit = 6

  const isEmojiOnly = m.text? /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}|\p{Emoji_Modifier}|\p{Emoji_Component})+$/u.test(m.text.trim()) : false
  const isSticker = m.mtype === 'stickerMessage'

  if (!isSticker &&!isEmojiOnly) return

  if (!userSpamData[sender] || (currentTime - userSpamData[sender].startTime > timeWindow)) {
    userSpamData[sender] = {
      startTime: currentTime,
      messageCount: 1
    }
  } else {
    userSpamData[sender].messageCount++
  }

  const count = userSpamData[sender].messageCount

  if (isOwner || isROwner) {
    if (count === warnLimit) {
      await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 👑 *AVISO A YALLICO*
│
│ 🌷 *Bájale al spam creador*
│ 🌸 *Estás saturando el jardín*
╰───────────────────────╯`, m)
    }
    return
  }

  if (m.isGroup && (isAdmin || isPrems ||!isBotAdmin)) return

  if (count === warnLimit) {
    await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ ⚠️ *¡DETECCIÓN DE SPAM!*
│
│ 🌷 *Usuario:* @${sender.split('@')[0]}
│ 📊 *Progreso:* ${count}/${kickLimit}
│ 🌸 *Advertencia:* Baja al flood
│
│ > *Sigue así y marchitas el jardín*
╰───────────────────────╯`, m, { mentions: [sender] })
  }
  else if (count >= kickLimit) {
    await conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *EXPULSIÓN EJECUTADA*
│
│ 🚮 *Usuario:* @${sender.split('@')[0]}
│ 📌 *Causa:* Spam de stickers/emojis
│ 🌸 *Protocolo del jardín activado*
│
│ > *Jardín protegido por Sakurita*
╰───────────────────────╯`, m, { mentions: [sender] })
    if (m.isGroup) {
      await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
    }
    delete userSpamData[sender]
  }
}

export default handler