const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply('⛈️ *RAYO PREM* ⚡\n\n❌ *¡ACCESO DENEGADO!*\nSolo los admins o el dueño pueden dictar sentencia.');
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setkick') {
        if (!text) return m.reply(`🌩️ *RAYO PREM SETKICK* ⚡\n\n❌ *¡FALTA EL MENSAJE!*\n\n💡 *Ejemplo:*\n.setkick 🚫 @user fue alcanzado por el trueno ⚡`);
        chat.customKick = text.trim();
        return m.reply(`⛈️ *RAYO PREM* ⚡\n\n✅ *¡KICK GUARDADO!*\n\n📝 *Vista previa:*\n\`\`${text.trim()}\`\n\n🗑️ *Para borrar:* .delkick`);
    }
    if (command === 'delkick') {
        if (!chat.customKick) return m.reply('🌩️ *RAYO PREM* ⚡\n\n⚠️ *No tienes un kick editado.*');
        delete chat.customKick;
        return m.reply('⛈️ *RAYO PREM* ⚡\n\n✅ *¡LISTO!*\n\n🗑️ Se eliminó el kick personalizado.');
    }
};
handler.help = ['setkick <mensaje>', 'delkick'];
handler.tags = ['group'];
handler.command = /^(setkick|delkick)$/i;
handler.admin = true;
handler.group = true;
export default handler;