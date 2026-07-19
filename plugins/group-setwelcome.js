const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ACCESO AL JARDÍN DENEGADO*
│
│ 🌷 *Solo los jardineros o el dueño*
│ 🌸 *pueden ejecutar este comando*
╰───────────────────────╯`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setwelcome') {
        if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *CONFIGURAR BIENVENIDA*
│
│ 🌸 *Falta el mensaje*
│
│ 📝 *Placeholders:*
│ @user = Mención
│ @group = Jardín  
│ @count = Pétalos
│ @desc = Descripción
│
│ 💡 *Ejemplo:*
│ .setwelcome 🌸 @user floreció en el jardín 🌷
│ 🌷 Bienvenido a @group
│ 👥 Pétalo #@count
╰───────────────────────╯`);
        chat.customWelcome = text.trim();
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *BIENVENIDA GUARDADA*
│
│ 📝 *Vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 🗑️ *Para borrar:* .delwelcome
╰───────────────────────╯`);
    }
    if (command === 'delwelcome') {
        if (!chat.customWelcome) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *SIN BIENVENIDA*
│
│ 🌷 *No tienes una bienvenida editada*
╰───────────────────────╯`);
        delete chat.customWelcome;
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *BIENVENIDA ELIMINADA*
│
│ 🗑️ *Se podó el mensaje personalizado*
│ 🌸 *Ahora se usa la de welcome.js*
╰───────────────────────╯`);
    }
};
handler.help = ['setwelcome <mensaje>', 'delwelcome'];
handler.tags = ['group'];
handler.command = /^(setwelcome|delwelcome)$/i;
handler.admin = true;
handler.group = true;
export default handler;