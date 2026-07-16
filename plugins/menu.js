import { join } from 'path'
import { readFileSync } from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  let taguser = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
  const img = readFileSync(join(process.cwd(), 'storage', 'img', 'rayo.jpg'))

  let totalUsers = Object.keys(global.db.data.users).length
  let totalCmds = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length

  let fecha = new Date()
  let opcionesDia = { weekday: 'long', timeZone: 'America/Lima' }
  let opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Lima' }
  let opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'America/Lima' }

  let dia = fecha.toLocaleDateString('es-PE', opcionesDia)
  let fechaCompleta = fecha.toLocaleDateString('es-PE', opcionesFecha)
  let hora = fecha.toLocaleTimeString('es-PE', opcionesHora)

  let uptime = process.uptime() * 1000
  let h = Math.floor(uptime / 3600000)
  let m2 = Math.floor(uptime / 60000) % 60
  let s = Math.floor(uptime / 1000) % 60

  let menuText = `ᯇ 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢 : ୧

 ⤷ ┇ version ﹒ 3.0.0 Thunder ：✿ 。
꒰ ◞⁺⊹ ．online public •

 ꒱ ׁ. ᘏ 𝗎𝗌𝗎⍺𝗋ⲓ𝗈 ׅ 𝆬 ָ֢ ෆ
⚡ ࣪ ꕀ ˚. ᵎᵎ
> Este es el menu de *RAYO PREM BOT* (𝐌𝐚𝐢𝐧-𝐁𝐨𝐭)

──愛 *Web ofc* ╏ 💐
forthreepro.github.io/For-Three-Bot

 ׅ 埃斯 : 𝖨𝗇ẜ𝗈 ﹙ ⚡ ﹚
> ﹒ @${taguser.split('@')[0]} ─ user
      ᶻz　*${totalUsers}* users　⋌

© ❛ *system*. android
名 ─ *uptime:* ${h}h ${m2}m ${s}s﹔
𖡎 ָ֢ ‍ँ 𝆬 ׅ ׁ ꕀ ׁ ׅ.

> ❍ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗅𝗈𝗌 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌 𝖽𝖾 𝖱𝖺𝗒𝗈

`

  let help = Object.values(global.plugins).filter(p => p.help &&!p.disabled)
  let groups = {}

  for (let plugin of help) {
    let category = plugin.tags? plugin.tags[0] : 'general'
    if (!groups[category]) groups[category] = []
    if (Array.isArray(plugin.help)) groups[category].push(...plugin.help)
    else groups[category].push(plugin.help)
  }

  let emojis = {
    'downloader': '📥', 'search': '🔍', 'config': '⚙️', 'group': '👥',
    'info': 'ℹ️', 'fun': '🎭', 'sticker': '⚡', 'owner': '👑',
    'anime': '🌸', 'rg': '💎', 'game': '🎮', 'general': '✨'
  }

  for (let category in groups) {
    let emoji = emojis[category] || '⛈️'
    let catName = category.toUpperCase()
    menuText += `.⃟𖥔 ݁. 𖦹˙— \`${catName}\` —˙𖦹.${emoji}꒷\n`
    for (let cmd of groups[category]) {
      menuText += ` ${emoji} ➛.${cmd}\n`
    }
    menuText += ` ㅤ└──.✦ ── ⊰ ̟!!.✦. ˙\n\n`
  }

  menuText += `⚡━━━━━━━━
⛈️ *BOT:* RAYO PREM BOT
⚡ *Creador:* Whois Yallico 👑
⛈️ *Versión:* 3.0.0 Thunder Edition
🌐 *Web:* forthreepro.github.io/For-Three-Bot

> *"Domina el trueno, domina el chat"* ⚡
⚡━━━━━━━━`

  await conn.sendMessage(m.chat, {
    image: img,
    caption: menuText,
    mentions: [taguser]
  }, { quoted: m })
}

handler.command = /^(menu|help|menú)$/i
handler.tags = ['info']
handler.help = ['menu']

export default handler