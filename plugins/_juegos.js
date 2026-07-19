let timeout = 60000
let db = global.db.data.users

let handler = async (m, { conn, command }) => {
    global.db.data.users = global.db.data.users || {}
    let user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {}
    user.puntosNumero = user.puntosNumero || 0
    user.premioNumero = user.premioNumero || false

    conn.juegoNumero = conn.juegoNumero || {}
    let id = m.sender

    if (command === 'numero') {
        if (id in conn.juegoNumero) return conn.reply(m.chat, '⚠️ Ya tienes una partida activa. Usa *.salirnum*', m)

        let max = 50 + (Math.floor(user.puntosNumero / 1000) * 50) // Cada 1000pts sube dificultad
        let numero = Math.floor(Math.random() * max) + 1
        let puntosGanar = Math.floor(max / 5) // +10pts si es 1-50, +20pts si es 1-100, etc

        let caption = `
〔 CYBER BOT - ADIVINA EL NÚMERO 〕🎯

Adivina un número del 1 al ${max}

Intentos: 5
Puntos en juego: ${puntosGanar}
Tus puntos: ${user.puntosNumero}/3000

Tienes 60 segundos
`.trim()

        conn.juegoNumero[id] = [
            numero,
            5,
            puntosGanar,
            setTimeout(() => {
                if (conn.juegoNumero[id]) {
                    conn.reply(m.chat, `⏰ Tiempo terminado!\nEl número era: *${numero}*`, m)
                    delete conn.juegoNumero[id]
                }
            }, timeout)
        ]
    }

    if (command === 'salirnum') {
        if (id in conn.juegoNumero) {
            clearTimeout(conn.juegoNumero[id][3])
            delete conn.juegoNumero[id]
            return conn.reply(m.chat, '❌ Juego cancelado', m)
        }
    }

    if (command === 'puntosnum') {
        return conn.reply(m.chat, `📊 Puntos Numero: ${user.puntosNumero}/3000\nRecompensa: Bot semanal gratis`, m)
    }
}

handler.command = /^(numero|salirnum|puntosnum)$/i
handler.tags = ['game']
export default handler

// RESPUESTAS
handler.before = async (m, { conn }) => {
    if (m.isGroup) return
    conn.juegoNumero = conn.juegoNumero || {}
    let id = m.sender
    if (!(id in conn.juegoNumero)) return

    global.db.data.users = global.db.data.users || {}
    let user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {}
    user.puntosNumero = user.puntosNumero || 0

    let numero = conn.juegoNumero[id][0]
    let puntos = conn.juegoNumero[id][2]
    let intento = parseInt(m.text)

    if (isNaN(intento)) return

    if (intento === numero) {
        clearTimeout(conn.juegoNumero[id][3])
        user.puntosNumero += puntos

        let msg = `🎉 ¡CORRECTO!\nEl número era: *${numero}*\n+${puntos} puntos\nTotal: ${user.puntosNumero}/3000`

        if (user.puntosNumero >= 3000 &&!user.premioNumero) {
            user.premioNumero = true
            msg += `\n\n👑 ¡3000 PUNTOS ALCANZADOS!\nReclama tu BOT SEMANAL GRATIS con @WhoisYallico`
        }

        delete conn.juegoNumero[id]
        return conn.reply(m.chat, msg, m)
    } else {
        conn.juegoNumero[id][1]--
        if (conn.juegoNumero[id][1] <= 0) {
            clearTimeout(conn.juegoNumero[id][3])
            delete conn.juegoNumero[id]
            return conn.reply(m.chat, `❌ Perdiste!\nEl número era: *${numero}*`, m)
        } else {
            let pista = intento < numero? '⬆️ Más alto' : '⬇️ Más bajo'
            return conn.reply(m.chat, `${pista}\nTe quedan ${conn.juegoNumero[id][1]} intentos`, m)
        }
    }
}