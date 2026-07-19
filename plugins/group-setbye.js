const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ACCESO AL JARDÍN DENEGADO*
│
│ 🌷 *Solo los jardineros o el dueño*
│ 🌸 *pueden podar el jardín*
╰───────────────────────╯`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setbye') {
        if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *CONFIGURAR DESPEDIDA*
│
│ 🌷 *Falta el mensaje*
│
│ 💡 *Ejemplo:*
│ .setbye 🍂 @user se marchitó del jardín 🌸
╰───────────────────────╯`);
        chat.customBye = text.trim();
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *DESPEDIDA GUARDADA*
│
│ 📝 *Vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 🗑️ *Para borrar:* .delbye
╰───────────────────────╯`);
    }
    if (command === 'delbye') {
        if (!chat.customBye) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *SIN DESPEDIDA*
│
│ 🌷 *No tienes una despedida editada*
╰───────────────────────╯`);
        delete chat.customBye;
        return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ ✅ *DESPEDIDA ELIMINADA*
│
│ 🗑️ *Se podó el mensaje personalizado*
╰───────────────────────╯`);
    }
};
handler.help = ['setbye <Mensaje>', 'delbye'];
handler.tags = ['group'];
handler.command = /^(setbye|delbye)$/i;
handler.admin = true;
handler.group = true;
export default handler;