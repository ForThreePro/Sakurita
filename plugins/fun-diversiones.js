let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    'gay': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *GAY*\n🌩️ *Team Nightwish*`, // Cambiado
    'lesbiana': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *LESBIANA*\n🌩️ *Team Nightwish*`, // Cambiado
    'pajero': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERO*\n🌩️ *Team Nightwish*`, // Cambiado
    'pajera': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERA*\n🌩️ *Team Nightwish*`, // Cambiado
    'puto': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PUTO*\n🔥 *MÁS INFORMACIÓN A SU PRIVADO* 🔥🥵\n🌩️ *Team Nightwish*`, // Cambiado
    'puta': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PUTA*\n🔥 *MÁS INFORMACIÓN A SU PRIVADO* 🔥🥵\n🌩️ *Team Nightwish*`, // Cambiado
    'manco': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MANCO* 💩\n🌩️ *Team Nightwish*`, // Cambiado
    'manca': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MANCA* 💩\n🌩️ *Team Nightwish*`, // Cambiado
    'rata': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *RATA* 🐁 *COME QUESO* 🧀\n🌩️ *Team Nightwish*`, // Cambiado
    'prostituto': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTO* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌩️ *Team Nightwish*`, // Cambiado
    'prostituta': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTA* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌩️ *Team Nightwish*` // Cambiado
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|manco|manca|rata|prostituta|prostituto)$/i

export default handler