let mutedUsers = new Set();

let handler = async (m, { conn, command, participants }) => {
    let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false;
    if (!mentionedJid) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *SISTEMA DE PODA*
│
│ 🌸 *Menciona a un pétalo o responde a un mensaje*
╰───────────────────────╯`);

    let isUserAdmin = participants.find(p => p.id === mentionedJid)?.admin;
    if (isUserAdmin) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *No puedes podar la voz de un jardinero*
╰───────────────────────╯`);
    if (mentionedJid === conn.user.jid) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *No puedo podarme a mi misma*
╰───────────────────────╯`);

    if (command === "mute") {
        mutedUsers.add(mentionedJid);
        conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🔇 *PÉTALO SILENCIADO*
│
│ 🌷 *@${mentionedJid.split('@')[0]}*
│ 🌸 *Sus pétalos serán podados*
╰───────────────────────╯`, m, { mentions: [mentionedJid] });
    } else if (command === "unmute") {
        mutedUsers.delete(mentionedJid);
        conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🔊 *PÉTALO DESBLOQUEADO*
│
│ 🌷 *@${mentionedJid.split('@')[0]}*
│ 🌸 *Ya puede florecer de nuevo*
╰───────────────────────╯`, m, { mentions: [mentionedJid] });
    }
};

handler.before = async (m, { conn, isAdmin }) => {
    // Si el remitente del mensaje está en la lista de muteados, eliminamos el mensaje
    if (mutedUsers.has(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute', 'unmute'].map(v => v + ' @user');
handler.tags = ['grupos'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;