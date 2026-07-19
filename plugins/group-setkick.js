const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ACCESO AL JARDÍN DENEGADO*
│
│ 🌷 *Solo los jardineros o el dueño*
│ 🌸 *pueden ejecutar comandos*
╰───────────────────────╯`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setkick') {
        if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *CONFIGURAR PODA*
│
│ 🌷 *Falta el mensaje*
│
│ 💡 *Ejemplo:*
│ .setkick 🥀 @user fue podado del jardín 🌸
╰───────────────────────╯`);
        chat.customKick = text.trim();
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *PODA GUARDADA*
│
│ 📝 *Vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 🗑️ *Para borrar:* .delkick
╰───────────────────────╯`);
    }
    if (command === 'delkick') {
        if (!chat.customKick) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *SIN PODA*
│
│ 🌷 *No tienes una poda personalizada*
╰───────────────────────╯`);
        delete chat.customKick;
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *PODA ELIMINADA*
│
│ 🗑️ *Se podó el mensaje personalizado*
╰───────────────────────╯`);
    }
};
handler.help = ['setkick <mensaje>', 'delkick'];
handler.tags = ['group'];
handler.command = /^(setkick|delkick)$/i;
handler.admin = true;
handler.group = true;
export default handler;