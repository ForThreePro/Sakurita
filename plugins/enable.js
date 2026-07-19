let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    // BASE
    'gay': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *GAY*\n🌸 *Sakurita Bot System*`,
    'lesbiana': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *LESBIANA*\n🌸 *Sakurita Bot System*`,
    'pajero': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERO*\n🌸 *Sakurita Bot System*`,
    'pajera': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERA*\n🌸 *Sakurita Bot System*`,
    'puto': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PUTO*\n🔥 *MÁS INFO EN SU PRIVADO* 🔥🥵\n🌸 *Sakurita Bot System*`,
    'puta': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PUTA*\n🔥 *MÁS INFO EN SU PRIVADO* 🔥🥵\n🌸 *Sakurita Bot System*`,
    'manco': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *MANCO* 💩\n🌸 *Sakurita Bot System*`,
    'manca': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *MANCA* 💩\n🌸 *Sakurita Bot System*`,
    'rata': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *RATA* 🐁 *COME QUESO* 🧀\n🌸 *Sakurita Bot System*`,
    'prostituto': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTO* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌸 *Sakurita Bot System*`,
    'prostituta': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTA* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌸 *Sakurita Bot System*`,

    // PERÚ + NUEVOS
    'choro': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CHORO* 🏃‍♂️💨\n⚠️ *GUARDEN SUS IPHONES* ⚠️\n🌸 *Sakurita Bot System*`,
    'cachero': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CACHERO* 😈\n🔥 *NI EN DISCOTECA LO PARAN* 🔥\n🌸 *Sakurita Bot System*`,
    'cauchera': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CAUCHERA* 😈💃\n🔥 *REINA DEL HUARIQUE* 🔥\n🌸 *Sakurita Bot System*`,
    'cabezón': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CABEZÓN* 🤯\n🧠 *PIENSA CON LA OTRA CABEZA*\n🌸 *Sakurita Bot System*`,
    'jinetero': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *JINETERO* 🏍️\n💨 *PILOTO DE MOTOTAXI*\n🌸 *Sakurita Bot System*`,
    'sangre': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *SANGRE* 🩸\n💸 *VIVE DE PRESTAMO*\n🌸 *Sakurita Bot System*`,
    'tragón': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *TRAGÓN* 🍻\n🍺 *SE TOMA HASTA EL AGUA DEL FLORERO*\n🌸 *Sakurita Bot System*`,
    'fresa': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *FRESA* 🍓\n💅 *HABLA COMO GRINGO*\n🌸 *Sakurita Bot System*`,
    'pipero': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PIPERO* 🌿\n😵‍💫 *VIVE EN OTRA DIMENSIÓN*\n🌸 *Sakurita Bot System*`,
    'muerto': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *MUERTO* 💀\n😴 *DUERME EN TODA REUNIÓN*\n🌸 *Sakurita Bot System*`,

    // TUS 5 PEDIDOS
    'burro': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *BURRO* 🫏\n🤡 *NI EL JARDINERO LO ENTIENDE*\n🌸 *Sakurita Bot System*`,
    'burra': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *BURRA* 🫏\n🤡 *REPROBÓ HASTA EN RIEGO*\n🌸 *Sakurita Bot System*`,
    'kbro': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *KBRO* 😈\n🔥 *NO RESPETA NI A LAS FLORES*\n🌸 *Sakurita Bot System*`,
    'chivo': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CHIVO* 🐐\n💨 *HUELE A CERVEZA Y JARDÍN*\n🌸 *Sakurita Bot System*`,
    'kchera': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *KCHERA* 😈💃\n🔥 *ROMPE CORAZONES*\n🌸 *Sakurita Bot System*`,

    // +30 NUEVOS
    'bamba': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *BAMBA* 📱\n⚠️ *CELULAR DURA 2 DIAS*\n🌸 *Sakurita Bot System*`,
    'yapa': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *YAPA* 🥭\n😏 *SIEMPRE PIDE DE MÁS*\n🌸 *Sakurita Bot System*`,
    'caña': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CAÑA* 🥃\n🍺 *CON 2 YA ESTÁ TIRADO*\n🌸 *Sakurita Bot System*`,
    'pata': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PATA* 🤝\n😎 *EL ALMA DE LA JODA*\n🌸 *Sakurita Bot System*`,
    'floro': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *FLORO* 💬\n💋 *ENAMORA CON PURA MENTIRA*\n🌸 *Sakurita Bot System*`,
    'miserable': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *MISERABLE* 💸\n🥺 *PIDE YAPA Y NO PAGA*\n🌸 *Sakurita Bot System*`,
    'gil': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *GIL* 🤡\n😵 *SE CAE SOLO*\n🌸 *Sakurita Bot System*`,
    'gilasa': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *GILASA* 🤡\n😵 *CREE TODO*\n🌸 *Sakurita Bot System*`,
    'lenteja': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *LENTEJA* 🐢\n🐌 *DEMORA 1 HORA EN RESPONDER*\n🌸 *Sakurita Bot System*`,
    'chibolo': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CHIBOLO* 👶\n🎮 *VIVE EN FREE FIRE*\n🌸 *Sakurita Bot System*`,
    'chibola': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *CHIBOLA* 👧\n💄 *SUBE 20 HISTORIAS AL DÍA*\n🌸 *Sakurita Bot System*`,
    'viejo': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *VIEJO* 👴\n😮‍💨 *SE QUEJA DE TODO*\n🌸 *Sakurita Bot System*`,
    'vieja': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *VIEJA* 👵\n🗣️ *CHISME NIVEL DIOS*\n🌸 *Sakurita Bot System*`,
    'grasa': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *GRASA* 💪\n🏋️ *SOLO VA AL GYM A TOMAR FOTOS*\n🌸 *Sakurita Bot System*`,
    'graso': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *GRASO* 💪\n😎 *PIENSA QUE ESTÁ BUENAZO*\n🌸 *Sakurita Bot System*`,
    'pituco': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PITUCO* 💎\n💳 *PAGA CON YAPE DE SU MAMÁ*\n🌸 *Sakurita Bot System*`,
    'pituca': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PITUCA* 💎\n💅 *TOMA CAFÉ DE 30 SOLES*\n🌸 *Sakurita Bot System*`,
    'sapa': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *SAPA* 🐸\n👀 *VE TODO Y CUENTA TODO*\n🌸 *Sakurita Bot System*`,
    'sapo': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *SAPO* 🐸\n👀 *EL INFORMATIVO DEL GRUPO*\n🌸 *Sakurita Bot System*`,
    'pavo': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PAVO* 🦃\n🤦 *SE TROPIEZA SOLO*\n🌸 *Sakurita Bot System*`,
    'pava': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *PAVA* 🦃\n🤦 *OLVIDA HASTA SU NOMBRE*\n🌸 *Sakurita Bot System*`,
    'trome': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *TROME* 👑\n🔥 *EL CRACK DEL JARDÍN*\n🌸 *Sakurita Bot System*`,
    'reina': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *REINA* 👑\n💅 *MANDA EN EL GRUPO*\n🌸 *Sakurita Bot System*`,
    'king': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *KING* 👑\n😎 *EL JEFE DE LA JODA*\n🌸 *Sakurita Bot System*`,
    'zombie': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *ZOMBIE* 🧟\n😴 *VIVE CON SUEÑO*\n🌸 *Sakurita Bot System*`,
    'tóxica': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *TÓXICA* ☠️\n💔 *REVISA CELULAR*\n🌸 *Sakurita Bot System*`,
    'tóxico': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *TÓXICO* ☠️\n💔 *CELOSO NIVEL DIOS*\n🌸 *Sakurita Bot System*`,
    'simp': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *SIMP* 🥺\n💌 *MANDA 50 AUDIOS*\n🌸 *Sakurita Bot System*`,
    'vago': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *VAGO* 🛌\n😴 *RIEGA 2 PLANTAS AL AÑO*\n🌸 *Sakurita Bot System*`,
    'vaga': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *VAGA* 🛌\n📺 *MARATON DE NETFLIX*\n🌸 *Sakurita Bot System*`,
    'loquito': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *LOQUITO* 🤪\n🌀 *HABLA CON LAS FLORES*\n🌸 *Sakurita Bot System*`,

    // NUEVOS PEDIDOS 🌸
    'fiel': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *FIEL* 💍\n❤️ *NI CON 10 JUGOS ENGANCHA*\n🌸 *Sakurita Bot System*`,
    'infiel': `🌸 *SAKURITA BOT SCANNER* 🌷\n\n🌷 *${userTarget}* *ES* *${porcentaje}%* *INFIEL* 💔\n😏 *TIENE 3 Y NINGUNA SABE*\n🌸 *Sakurita Bot System*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'burro', 'burra', 'kbro', 'chivo', 'kchera', 'choro', 'cachero', 'cauchera', 'cabezón', 'jinetero', 'sangre', 'tragón', 'fresa', 'pipero', 'muerto', 'bamba', 'yapa', 'caña', 'pata', 'floro', 'miserable', 'gil', 'gilasa', 'lenteja', 'chibolo', 'chibola', 'viejo', 'vieja', 'grasa', 'graso', 'pituco', 'pituca', 'sapa', 'sapo', 'pavo', 'pava', 'trome', 'reina', 'king', 'zombie', 'tóxica', 'tóxico', 'simp', 'vago', 'vaga', 'loquito', 'manco', 'manca', 'rata', 'prostituta', 'prostituto', 'fiel', 'infiel'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|burro|burra|kbro|chivo|kchera|choro|cachero|cauchera|cabezón|jinetero|sangre|tragón|fresa|pipero|muerto|bamba|yapa|caña|pata|floro|miserable|gil|gilasa|lenteja|chibolo|chibola|viejo|vieja|grasa|graso|pituco|pituca|sapa|sapo|pavo|pava|trome|reina|king|zombie|tóxica|tóxico|simp|vago|vaga|loquito|manco|manca|rata|prostituta|prostituto|fiel|infiel)$/i

export default handler