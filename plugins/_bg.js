let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime) return conn.reply(m.chat, `❄ *Responde a una imagen con ${usedPrefix + command}*`, m)
    if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, `⚠️ *Solo imágenes JPG/PNG*`, m)

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    try {
        let img = await q.download()
        
        // Subir imagen a telegra
        let form = new FormData()
        form.append('file', new Blob([img]), 'image.jpg')
        let up = await fetch('https://telegra.ph/upload', { method: 'POST', body: form })
        let imgUrl = 'https://telegra.ph' + (await up.json())[0].src

        let result = null
        let api = ''

        // API 1: SIPUTZX
        try {
            api = 'siputzx'
            let res = await fetch(`https://api.siputzx.my.id/api/iloveimg/removebg?image=${encodeURIComponent(imgUrl)}`)
            if(res.ok) result = res.url
        } catch(e){}

        // API 2: LOLHUMAN
        if(!result) try {
            api = 'lolhuman'
            let res = await fetch(`https://api.lolhuman.xyz/api/removebg?apikey=GataDiosV3&img=${imgUrl}`)
            let json = await res.json()
            if(json.status == 200) result = json.result
        } catch(e){}

        // API 3: SKIZO
        if(!result) try {
            api = 'skizo'
            let res = await fetch(`https://skizo.tech/api/removebg?apikey=GataDios&url=${imgUrl}`)
            let json = await res.json()
            if(json.status) result = json.result
        } catch(e){}

        if(!result) throw 'No se pudo quitar el fondo'

        await conn.sendFile(m.chat, result, 'nofondo.png', `✅ *Fondo eliminado*\n⚡ *API:* ${api}`, m)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        conn.reply(m.chat, `❌ *Error:* ${e}`, m)
    }
}

handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(removebg|nofondo|rbg)$/i

module.exports = handler // <- SOLO ESTO