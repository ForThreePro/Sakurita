import { exec } from "child_process"

const handler = async (m, { conn }) => {
    const owner = "👑 *Cultivadora: Whois Yallico*"

    if (m.react) await m.react('🌸')

    await conn.reply(m.chat, '🌷 *SAKURITA BOT* ➔ Regando el jardín... Actualizando pétalos.', m)

    exec('git pull', async (err, stdout, stderr) => {
        if (err) {
            if (m.react) await m.react('✖️')
            return conn.reply(m.chat, `🥀 *SAKURITA BOT ERROR* ➔ Falló la actualización.\n\n\`\`${err.message}\`\n\n${owner}`, m)
        }

        if (stdout.includes('Already up to date.')) {
            if (m.react) await m.react('✔️')
            return conn.reply(m.chat, `🌸 *SAKURITA BOT* ➔ El jardín ya está florecido con la última versión.\n\n${owner}\n> "El jardín nunca se marchita"`, m)
        }

        if (m.react) await m.react('🌸')
        return conn.reply(m.chat, `🌸 *SAKURITA BOT* ➔ Nuevos pétalos añadidos al jardín.\n\n*📜 Cambios:*\n\`\`${stdout}\`\n\n${owner}`, m)
    })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar|fix)$/i
handler.rowner = true

export default handler