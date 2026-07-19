import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🎵 *JARDÍN DE MELODÍAS*
│
│ 🌷 *¿Qué canción buscas?*
│ 🌸 *Uso:*.letra Imagine Dragons
╰───────────────────────╯`)

    await m.react('🎵')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/lyrics?query=${encodeURIComponent(text)}`)
        let res = data.data
        if (!res) return m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *SIN RESULTADOS*
│
│ 🌷 *No encontré la letra de:* ${text}
╰───────────────────────╯`)

        let txt = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🎵 *LETRA ENCONTRADA*
│
│ 🌷 *Título:* ${res.title}
│ 👤 *Artista:* ${res.artists}
│ ⏳ *Duración:* ${res.duration || 'N/A'}
╰───────────────────────╯\n\n`
        txt += `╭─── 🌸 𝗟𝗘𝗧𝗥𝗔 𝗗𝗘𝗟 𝗝𝗔𝗥𝗗𝗜́𝗡 ───╮\n`
        txt += `${res.lyrics}\n`
        txt += `╰─────────────────────────╯\n\n`
        txt += `> *“La melodía floreció con Sakurita Bot AI”* 🌷\n> *© Sakurita Bot System*`

        m.reply(txt)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *Falló al buscar la letra*
│ 🌸 *Intenta de nuevo*
╰───────────────────────╯`)
    }
}
handler.help = ['letra <cancion>']
handler.tags = ['search']
handler.command = /^(letra|lyrics)$/i
export default handler