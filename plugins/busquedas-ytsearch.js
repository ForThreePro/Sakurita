import axios from 'axios'
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚡ *CYBER BOT YT SEARCH* 💻\n\n🤖 *¿Qué deseas buscar en YouTube?*') // Cambiado
    await m.react('📺')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`)
        if (!data.data || data.data.length === 0) return m.reply(`⚡ *CYBER BOT ERROR* ➔ *No se encontraron resultados.*`) // Cambiado

        let res = data.data.slice(0, 5).map((v, i) => 
            `💻 *${i+1}.* *${v.title}*\n` +
            `⏳ *Duración:* ${v.duration} | 👁️ *Vistas:* ${v.views}\n` +
            `👤 *Canal:* ${v.author.name}\n` +
            `🔗 ${v.url}`
        ).join('\n\n')

        let cap = `⚡ *CYBER BOT YOUTUBE SEARCH* 💻\n\n` // Cambiado
        cap += res
        cap += `\n\n⚡ *Usa:* .play <número> o copia el link para descargar\n💻 *Cyber Bot System*` // Cambiado

        m.reply(cap)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`⚡ *CYBER BOT ERROR* ➔ *Error al buscar.*`) // Cambiado
    }
}
handler.help = ['yts <busqueda>']
handler.tags = ['search']
handler.command = /^(yts|ytsearch)$/i
export default handler