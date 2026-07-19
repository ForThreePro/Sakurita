import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *BÚSQUEDA EN EL JARDÍN*
│
│ 🌸 *¿Qué pétalo buscas?*
│ 🌷 *Uso:*.google Sakurita Bot
╰───────────────────────╯`)

    await m.react('🔍')

    try {
        let { data } = await axios.get(`https://api.delirius.store/search/google?query=${encodeURIComponent(text)}`)
        let results = data.data.slice(0, 5)

        if (!results.length) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *SIN RESULTADOS*
│
│ 🌷 *No se encontró nada sobre:* ${text}
╰───────────────────────╯`)

        let txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🔍 *RESULTADOS DEL JARDÍN*
│
│ 🌸 *Consulta:* ${text}
╰───────────────────────╯\n\n`

        txt += results.map((v, i) => {
            return `╭─── 🌷 *PÉTALO ${i + 1}* ───╮
│ 📌 *${v.title}*
│ 📝 ${v.description}
│ 🔗 ${v.url}
╰───────────────────╯`
        }).join('\n\n')

        txt += `\n\n> *“Datos florecidos por Sakurita Bot AI”* 🌸\n> *© Sakurita Bot System*`

        await conn.reply(m.chat, txt, m)
        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *Falló la búsqueda*
│ 🌸 *Intenta de nuevo*
╰───────────────────────╯`)
    }
}

handler.help = ['google <busqueda>']
handler.tags = ['search']
handler.command = /^google$/i

export default handler