import axios from 'axios'
import fetch from "node-fetch"

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *DESCARGADOR SOCIAL*
│
│ ⚡ *Uso:*.${command} [link]
│
│ 🌙 *Soporta:*
│ 📸 Instagram:.ig link
│ 📘 Facebook:.fb link
│ 📦 MediaFire:.mediafire link
│
│ > *“Descarga el poder del trueno”*
╰─────────────────❒`, m)

    await m.react('⏳')

    try {
        const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
        const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG'

            let media = data.data[0]
            let type = media.type === 'video'? 'VIDEO' : 'IMAGEN'

            let cap = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 📸 *INSTAGRAM DOWNLOADER*
│
│ ⚡ *Tipo:* ${type}
│ 🌙 *Estado:* Enviando contenido
│ ⛈️ *Servidor:* evogb.org
│
│ > *“Capturado en la tormenta nocturna”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB'

            let video = data.resultados[0]

            let cap = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 📘 *FACEBOOK DOWNLOADER*
│
│ ⚡ *Calidad:* ${video.calidad || 'HD'}
│ 🌙 *Estado:* Enviando video
│ ⛈️ *Servidor:* evogb.org
│
│ > *“El video fue extraído por el rayo”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()

            if (!result.status ||!result.data) {
                await m.react('⚠️')
                throw 'MF'
            }

            let { name, size, date, dl } = result.data
            let caption = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 📦 *MEDIAFIRE DOWNLOADER*
│
│ 🏷 *Nombre:* ${name}
│ ⚖ *Tamaño:* ${size}
│ 📅 *Fecha:* ${date}
│ ⚡ *Estado:* Enviando archivo
│
│ > *“Archivo extraído de la nube nocturna”*
╰─────────────────❒`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')

        let errorMsg = '❌ Error al procesar'
        if (e === 'IG') errorMsg = 'No se pudo descargar el contenido de Instagram'
        if (e === 'FB') errorMsg = 'No se pudo descargar el video de Facebook'
        if (e === 'MF') errorMsg = 'No se pudo localizar el archivo de MediaFire'

        m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *ERROR*
│
│ ⚡ *${errorMsg}*
│ 🌙 *Verifica el enlace*
╰─────────────────❒`)
    }
}

handler.help = ['ig <link>', 'fb <link>', 'mediafire <link>']
handler.tags = ['downloader']
handler.command = /^(ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler