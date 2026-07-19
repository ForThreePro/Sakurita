let timeout = 90000
let db = global.db.data.users

let handler = async (m, { conn, usedPrefix, command }) => {
    conn.juegoPais = conn.juegoPais? conn.juegoPais : {}
    let id = m.chat
    let user = db[m.sender]

    if (!user.puntosPais) user.puntosPais = 0
    if (!user.nivelPais) user.nivelPais = 1

    if (command === 'pais') {
        if (id in conn.juegoPais) return conn.reply(m.chat, '⚠️ Ya hay una partida activa. Usa *.salir*', conn.juegoPais[id][0])

        // TODOS LOS PAÍSES
        let paises = [
            {pais: 'afganistan', emoji: '🇦🇫', nivel: 3}, {pais: 'albania', emoji: '🇦🇱', nivel: 3}, {pais: 'argelia', emoji: '🇩🇿', nivel: 2},
            {pais: 'andorra', emoji: '🇦🇩', nivel: 4}, {pais: 'angola', emoji: '🇦🇴', nivel: 3}, {pais: 'antigua y barbuda', emoji: '🇦🇬', nivel: 4},
            {pais: 'argentina', emoji: '🇦🇷', nivel: 1}, {pais: 'armenia', emoji: '🇦🇲', nivel: 3}, {pais: 'australia', emoji: '🇦🇺', nivel: 1},
            {pais: 'austria', emoji: '🇦🇹', nivel: 2}, {pais: 'azerbaiyan', emoji: '🇦🇿', nivel: 3}, {pais: 'bahamas', emoji: '🇧🇸', nivel: 3},
            {pais: 'bahrein', emoji: '🇧🇭', nivel: 4}, {pais: 'bangladesh', emoji: '🇧🇩', nivel: 2}, {pais: 'barbados', emoji: '🇧', nivel: 4},
            {pais: 'belarus', emoji: '🇧🇾', nivel: 3}, {pais: 'belgica', emoji: '🇧🇪', nivel: 1}, {pais: 'belice', emoji: '🇧🇿', nivel: 4},
            {pais: 'benin', emoji: '🇧🇯', nivel: 3}, {pais: 'bhutan', emoji: '🇧🇹', nivel: 4}, {pais: 'bolivia', emoji: '🇧🇴', nivel: 2},
            {pais: 'bosnia', emoji: '🇧🇦', nivel: 3}, {pais: 'botswana', emoji: '🇧🇼', nivel: 3}, {pais: 'brasil', emoji: '🇧🇷', nivel: 1},
            {pais: 'brunei', emoji: '🇧🇳', nivel: 4}, {pais: 'bulgaria', emoji: '🇧🇬', nivel: 2}, {pais: 'burkina faso', emoji: '🇧🇫', nivel: 3},
            {pais: 'burundi', emoji: '🇧🇮', nivel: 3}, {pais: 'cabo verde', emoji: '🇨🇻', nivel: 3}, {pais: 'camboya', emoji: '🇰🇭', nivel: 2},
            {pais: 'camerun', emoji: '🇨🇲', nivel: 3}, {pais: 'canada', emoji: '🇨🇦', nivel: 1}, {pais: 'chad', emoji: '🇹🇩', nivel: 3},
            {pais: 'chile', emoji: '🇨🇱', nivel: 1}, {pais: 'china', emoji: '🇨🇳', nivel: 1}, {pais: 'chipre', emoji: '🇨🇾', nivel: 3},
            {pais: 'colombia', emoji: '🇨🇴', nivel: 1}, {pais: 'comoras', emoji: '🇰🇲', nivel: 4}, {pais: 'congo', emoji: '🇨🇬', nivel: 3},
            {pais: 'corea del norte', emoji: '🇰🇵', nivel: 2}, {pais: 'corea del sur', emoji: '🇰🇷', nivel: 1}, {pais: 'costa rica', emoji: '🇨🇷', nivel: 2},
            {pais: 'croacia', emoji: '🇭🇷', nivel: 2}, {pais: 'cuba', emoji: '🇨🇺', nivel: 2}, {pais: 'dinamarca', emoji: '🇩🇰', nivel: 2},
            {pais: 'djibouti', emoji: '🇩🇯', nivel: 4}, {pais: 'dominica', emoji: '🇩🇲', nivel: 4}, {pais: 'ecuador', emoji: '🇪🇨', nivel: 2},
            {pais: 'egipto', emoji: '🇪🇬', nivel: 1}, {pais: 'el salvador', emoji: '🇸🇻', nivel: 2}, {pais: 'emiratos arabes', emoji: '🇦🇪', nivel: 2},
            {pais: 'eritrea', emoji: '🇪🇷', nivel: 4}, {pais: 'eslovaquia', emoji: '🇸🇰', nivel: 3}, {pais: 'eslovenia', emoji: '🇸🇮', nivel: 3},
            {pais: 'españa', emoji: '🇪🇸', nivel: 1}, {pais: 'estados unidos', emoji: '🇺🇸', nivel: 1}, {pais: 'estonia', emoji: '🇪🇪', nivel: 3},
            {pais: 'etiopia', emoji: '🇪🇹', nivel: 2}, {pais: 'filipinas', emoji: '🇵🇭', nivel: 2}, {pais: 'finlandia', emoji: '🇫🇮', nivel: 2},
            {pais: 'francia', emoji: '🇫🇷', nivel: 1}, {pais: 'gabon', emoji: '🇬🇦', nivel: 3}, {pais: 'gambia', emoji: '🇬🇲', nivel: 4},
            {pais: 'georgia', emoji: '🇬🇪', nivel: 3}, {pais: 'ghana', emoji: '🇬🇭', nivel: 2}, {pais: 'granada', emoji: '🇬🇩', nivel: 4},
            {pais: 'grecia', emoji: '🇬🇷', nivel: 1}, {pais: 'guatemala', emoji: '🇬🇹', nivel: 2}, {pais: 'guinea', emoji: '🇬🇳', nivel: 3},
            {pais: 'guinea ecuatorial', emoji: '🇬🇶', nivel: 4}, {pais: 'guinea bisau', emoji: '🇬🇼', nivel: 4}, {pais: 'guyana', emoji: '🇬🇾', nivel: 3},
            {pais: 'haiti', emoji: '🇭🇹', nivel: 3}, {pais: 'honduras', emoji: '🇭🇳', nivel: 2}, {pais: 'hungria', emoji: '🇭🇺', nivel: 2},
            {pais: 'india', emoji: '🇮🇳', nivel: 1}, {pais: 'indonesia', emoji: '🇮🇩', nivel: 1}, {pais: 'irak', emoji: '🇮🇶', nivel: 2},
            {pais: 'iran', emoji: '🇮🇷', nivel: 2}, {pais: 'irlanda', emoji: '🇮🇪', nivel: 2}, {pais: 'islandia', emoji: '🇮🇸', nivel: 3},
            {pais: 'israel', emoji: '🇮🇱', nivel: 2}, {pais: 'italia', emoji: '🇮🇹', nivel: 1}, {pais: 'jamaica', emoji: '🇯🇲', nivel: 2},
            {pais: 'japon', emoji: '🇯🇵', nivel: 1}, {pais: 'jordania', emoji: '🇯🇴', nivel: 3}, {pais: 'kazajistan', emoji: '🇰🇿', nivel: 3},
            {pais: 'kenia', emoji: '🇰🇪', nivel: 2}, {pais: 'kirguistan', emoji: '🇰🇬', nivel: 4}, {pais: 'kuwait', emoji: '🇰🇼', nivel: 3},
            {pais: 'laos', emoji: '🇱🇦', nivel: 3}, {pais: 'lesotho', emoji: '🇱🇸', nivel: 4}, {pais: 'letonia', emoji: '🇱🇻', nivel: 3},
            {pais: 'libano', emoji: '🇱🇧', nivel: 3}, {pais: 'liberia', emoji: '🇱🇷', nivel: 3}, {pais: 'libia', emoji: '🇱🇾', nivel: 2},
            {pais: 'liechtenstein', emoji: '🇱🇮', nivel: 4}, {pais: 'lituania', emoji: '🇱🇹', nivel: 3}, {pais: 'luxemburgo', emoji: '🇱🇺', nivel: 3},
            {pais: 'macedonia', emoji: '🇲🇰', nivel: 3}, {pais: 'madagascar', emoji: '🇲🇬', nivel: 2}, {pais: 'malasia', emoji: '🇲🇾', nivel: 2},
            {pais: 'malawi', emoji: '🇲🇼', nivel: 3}, {pais: 'maldivas', emoji: '🇲🇻', nivel: 3}, {pais: 'mali', emoji: '🇲🇱', nivel: 3},
            {pais: 'malta', emoji: '🇲🇹', nivel: 3}, {pais: 'marruecos', emoji: '🇲🇦', nivel: 2}, {pais: 'mauricio', emoji: '🇲🇺', nivel: 3},
            {pais: 'mauritania', emoji: '🇲🇷', nivel: 3}, {pais: 'mexico', emoji: '🇲🇽', nivel: 1}, {pais: 'micronesia', emoji: '🇫🇲', nivel: 4},
            {pais: 'moldavia', emoji: '🇲🇩', nivel: 3}, {pais: 'monaco', emoji: '🇲🇨', nivel: 4}, {pais: 'mongolia', emoji: '🇲🇳', nivel: 3},
            {pais: 'montenegro', emoji: '🇲🇪', nivel: 3}, {pais: 'mozambique', emoji: '🇲🇿', nivel: 3}, {pais: 'myanmar', emoji: '🇲', nivel: 3},
            {pais: 'namibia', emoji: '🇳🇦', nivel: 3}, {pais: 'nauru', emoji: '🇳🇷', nivel: 4}, {pais: 'nepal', emoji: '🇳🇵', nivel: 3},
            {pais: 'nicaragua', emoji: '🇳🇮', nivel: 2}, {pais: 'niger', emoji: '🇳🇪', nivel: 3}, {pais: 'nigeria', emoji: '🇳🇬', nivel: 2},
            {pais: 'noruega', emoji: '🇳🇴', nivel: 2}, {pais: 'nueva zelanda', emoji: '🇳🇿', nivel: 2}, {pais: 'oman', emoji: '🇴🇲', nivel: 3},
            {pais: 'paises bajos', emoji: '🇳🇱', nivel: 1}, {pais: 'pakistan', emoji: '🇵🇰', nivel: 2}, {pais: 'palaos', emoji: '🇵🇼', nivel: 4},
            {pais: 'panama', emoji: '🇵🇦', nivel: 2}, {pais: 'papua nueva guinea', emoji: '🇵🇬', nivel: 3}, {pais: 'paraguay', emoji: '🇵🇾', nivel: 2},
            {pais: 'peru', emoji: '🇵🇪', nivel: 1}, {pais: 'polonia', emoji: '🇵🇱', nivel: 2}, {pais: 'portugal', emoji: '🇵🇹', nivel: 1},
            {pais: 'qatar', emoji: '🇶🇦', nivel: 3}, {pais: 'reino unido', emoji: '🇬🇧', nivel: 1}, {pais: 'republica centroafricana', emoji: '🇨🇫', nivel: 4},
            {pais: 'republica checa', emoji: '🇨🇿', nivel: 2}, {pais: 'republica dominicana', emoji: '🇩🇴', nivel: 2}, {pais: 'ruanda', emoji: '🇷🇼', nivel: 3},
            {pais: 'rumania', emoji: '🇷🇴', nivel: 2}, {pais: 'rusia', emoji: '🇷🇺', nivel: 1}, {pais: 'samoa', emoji: '🇼🇸', nivel: 4},
            {pais: 'san marino', emoji: '🇸🇲', nivel: 4}, {pais: 'san vicente', emoji: '🇻🇨', nivel: 4}, {pais: 'santa lucia', emoji: '🇱🇨', nivel: 4},
            {pais: 'santo tome', emoji: '🇸🇹', nivel: 4}, {pais: 'senegal', emoji: '🇸🇳', nivel: 3}, {pais: 'serbia', emoji: '🇷🇸', nivel: 3},
            {pais: 'seychelles', emoji: '🇸🇨', nivel: 4}, {pais: 'sierra leona', emoji: '🇸🇱', nivel: 3}, {pais: 'singapur', emoji: '🇸🇬', nivel: 2},
            {pais: 'siria', emoji: '🇸🇾', nivel: 3}, {pais: 'somalia', emoji: '🇸🇴', nivel: 3}, {pais: 'sri lanka', emoji: '🇱🇰', nivel: 3},
            {pais: 'sudafrica', emoji: '🇿🇦', nivel: 2}, {pais: 'sudan', emoji: '🇸🇩', nivel: 3}, {pais: 'suecia', emoji: '🇸🇪', nivel: 2},
            {pais: 'suiza', emoji: '🇨🇭', nivel: 2}, {pais: 'surinam', emoji: '🇸🇷', nivel: 3}, {pais: 'tailandia', emoji: '🇹🇭', nivel: 2},
            {pais: 'tanzania', emoji: '🇹🇿', nivel: 3}, {pais: 'tayikistan', emoji: '🇹🇯', nivel: 4}, {pais: 'togo', emoji: '🇹🇬', nivel: 3},
            {pais: 'tonga', emoji: '🇹🇴', nivel: 4}, {pais: 'trinidad y tobago', emoji: '🇹🇹', nivel: 3}, {pais: 'tunez', emoji: '🇹🇳', nivel: 3},
            {pais: 'turkmenistan', emoji: '🇹🇲', nivel: 4}, {pais: 'turquia', emoji: '🇹🇷', nivel: 1}, {pais: 'ucrania', emoji: '🇺🇦', nivel: 2},
            {pais: 'uganda', emoji: '🇺🇬', nivel: 3}, {pais: 'uruguay', emoji: '🇺🇾', nivel: 2}, {pais: 'uzbekistan', emoji: '🇺🇿', nivel: 3},
            {pais: 'vanuatu', emoji: '🇻🇺', nivel: 4}, {pais: 'vaticano', emoji: '🇻🇦', nivel: 4}, {pais: 'venezuela', emoji: '🇻🇪', nivel: 2},
            {pais: 'vietnam', emoji: '🇻🇳', nivel: 2}, {pais: 'yemen', emoji: '🇾🇪', nivel: 3}, {pais: 'zambia', emoji: '🇿🇲', nivel: 3},
            {pais: 'zimbabue', emoji: '🇿🇼', nivel: 3}
        ]

        let paisesNivel = paises.filter(p => p.nivel <= user.nivelPais)
        let random = paisesNivel[Math.floor(Math.random() * paisesNivel.length)]
        let respuesta = random.pais
        let emoji = random.emoji
        let puntosGanar = random.nivel * 50

        let caption = `
〔 CYBER BOT - ADIVINA EL PAÍS 〕🌍

${emoji}

Nivel: ${user.nivelPais}/4
Puntos: ${puntosGanar}
Total: ${user.puntosPais}/10000

90s y 3 intentos
`.trim()

        conn.juegoPais[id] = [
            await conn.reply(m.chat, caption, m),
            respuesta.toLowerCase(),
            3,
            puntosGanar,
            setTimeout(() => {
                if (conn.juegoPais[id]) {
                    conn.reply(m.chat, `⏰ Tiempo!\nRespuesta: *${respuesta}*`, conn.juegoPais[id][0])
                    delete conn.juegoPais[id]
                }
            }, timeout)
        ]
    }

    if (command === 'salir') {
        if (id in conn.juegoPais) {
            clearTimeout(conn.juegoPais[id][4])
            delete conn.juegoPais[id]
            return conn.reply(m.chat, '❌ Juego cancelado', m)
        }
    }

    if (command === 'puntos') {
        return conn.reply(m.chat, `📊 Tus puntos: ${user.puntosPais}/10000\nNivel: ${user.nivelPais}/4`, m)
    }
}

handler.command = /^(pais|salir|puntos)$/i
handler.tags = ['game']
handler.help = ['pais', 'salir', 'puntos']
export default handler

// SISTEMA DE RESPUESTAS
handler.before = async (m, { conn }) => {
    conn.juegoPais = conn.juegoPais? conn.juegoPais : {}
    let id = m.chat
    if (!(id in conn.juegoPais)) return

    let user = db[m.sender]
    if (!user.puntosPais) user.puntosPais = 0
    if (!user.nivelPais) user.nivelPais = 1

    if (m.isBaileys) return

    let respuesta = conn.juegoPais[id][1]
    let puntos = conn.juegoPais[id][3]

    if (m.text.toLowerCase() === respuesta) {
        clearTimeout(conn.juegoPais[id][4])
        user.puntosPais += puntos

        let msg = `🎉 ¡Correcto!\nEra: *${respuesta}*\n+${puntos} puntos\n\nTotal: ${user.puntosPais}/10000`

        if (user.puntosPais >= user.nivelPais * 1000 && user.nivelPais < 4) {
            user.nivelPais++
            msg += `\n\n🔥 ¡SUBISTE A NIVEL ${user.nivelPais}!`
        }

        if (user.puntosPais >= 10000 &&!user.premioReclamado) {
            user.premioReclamado = true
            msg += `\n\n👑 ¡10,000 PUNTOS!\nReclama tu BOT SEMANAL GRATIS con @WhoisYallico`
        }

        delete conn.juegoPais[id]
        return conn.reply(m.chat, msg, m)
    } else {
        conn.juegoPais[id][2]--
        if (conn.juegoPais[id][2] <= 0) {
            clearTimeout(conn.juegoPais[id][4])
            delete conn.juegoPais[id]
            return conn.reply(m.chat, `❌ Perdiste!\nEra: *${respuesta}*`, m)
        } else {
            return conn.reply(m.chat, `❌ Mal\nQuedan ${conn.juegoPais[id][2]} intentos`, m)
        }
    }
}