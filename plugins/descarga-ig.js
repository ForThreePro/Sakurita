import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *JARDÍN DE DESCARGAS*
│
│ 🌸 *YouTube:*
│ 🌷 *.play* nombre = Audio YT
│ 🌷 *.play2* nombre = Video YT
│ 🌷 *.ytmp3* link/nombre = Audio Directo
│ 🌷 *.ytmp4* link/nombre = Video 720p Directo
│
│ 🌸 *Música y Social:*
│ 🌷 *.spotify* nombre = Audio SP
│ 🌷 *.tiktok* link = Video TT
│ 🌷 *.tiktoksearch* texto = Buscar TT
│ 🌷 *.ig* link = Instagram
│ 🌷 *.fb* link = Facebook
│ 🌷 *.mediafire* link = MediaFire
│
│ > *“Pétalos florecidos por Sakurita Bot AI”*
╰───────────────────────╯`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *YOUTUBE ${isVideo? 'VIDEO' : 'AUDIO'}*
│
│ 📌 *Título:* ${vid.title}
│ ⏳ *Duración:* ${vid.timestamp}
│ 👤 *Autor:* ${vid.author.name}
│ 👁️ *Vistas:* ${vid.views.toLocaleString()}
│ 📁 *Formato:* ${isVideo? 'MP4 720p' : 'MP3 320kbps'}
│
│ > *“Extrayendo pétalos del jardín”*
╰───────────────────────╯`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
             ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *YOUTUBE ${isVideo? 'VIDEO' : 'AUDIO'} DIRECTO*
│
│ 📌 *Título:* ${vid.title}
│ 📁 *Formato:* ${isVideo? 'MP4 720p' : 'MP3'}
│ ⏱️ *Duración:* ${vid.timestamp}
│ 👁️ *Vistas:* ${vid.views.toLocaleString()}
│
│ > *“Descarga florecida por el jardín”*
╰───────────────────────╯`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🎵 *SPOTIFY DOWNLOADER*
│
│ 🌷 *Título:* ${dlData.data.name}
│ 👤 *Artista:* ${dlData.data.artist}
│ 💿 *Álbum:* ${dlData.data.album}
│ ⏳ *Duración:* ${dlData.data.duration}
│ 📅 *Año:* ${dlData.data.year}
│
│ > *“Melodía florecida por Sakurita Bot”*
╰───────────────────────╯`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *TIKTOK SEARCH*
│
│ 🌸 *Título:* ${video.title}
│ 👤 *Autor:* ${video.author.nickname}
│ 👁️ *Vistas:* ${video.play_count.toLocaleString()}
│ ❤️ *Likes:* ${video.digg_count.toLocaleString()}
│
│ > *“Pétalo encontrado en el jardín”*
╰───────────────────────╯`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *TIKTOK DOWNLOADER*
│
│ 🌸 *Título:* ${data.title}
│ 👤 *Autor:* ${data.author.nickname}
│
│ > *“Pétalo descargado del jardín”*
╰───────────────────────╯`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? 'VIDEO' : 'IMAGEN'

            let cap = `🌸╭─── SAKURITA BOT ───╮🌸
│ 📸 *INSTAGRAM DOWNLOADER*
│
│ 🌷 *Tipo:* ${type}
│ 🌸 *Estado:* Enviando pétalo
│
│ > *“Contenido florecido por el jardín”*
╰───────────────────────╯`

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
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `🌸╭─── SAKURITA BOT ───╮🌸
│ 📘 *FACEBOOK DOWNLOADER*
│
│ 🌷 *Calidad:* ${video.calidad || 'HD'}
│ 🌸 *Estado:* Enviando pétalo
│
│ > *“Video florecido por el jardín”*
╰───────────────────────╯`

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
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `🌸╭─── SAKURITA BOT ───╮🌸
│ 📦 *MEDIAFIRE DOWNLOADER*
│
│ 🏷 *Nombre:* ${name}
│ ⚖ *Tamaño:* ${size}
│ 📅 *Fecha:* ${date}
│
│ > *“Pétalo extraído del jardín”*
╰───────────────────────╯`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: 'No se encontró el pétalo',
            YT_DL_ERROR: 'Error al florecer la descarga de YouTube',
            SP_NOT_FOUND: `No se encontraron melodías para: ${text}`,
            SP_DL_ERROR: 'Error al obtener la melodía de Spotify',
            TT_NOT_FOUND: 'No se encontraron pétalos en TikTok',
            TT_DL_ERROR: 'No se pudo florecer el video de TikTok',
            IG_ERROR: 'Error al florecer el enlace de Instagram',
            FB_ERROR: 'Error al florecer el video de Facebook',
            MF_ERROR: 'No se pudo localizar el pétalo de MediaFire'
        }
        m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🥀 *ERROR DEL JARDÍN*
│
│ 🌷 *${msgs[e] || 'Error inesperado'}*
│ 🌸 *Verifica el enlace/búsqueda*
╰───────────────────────╯`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler