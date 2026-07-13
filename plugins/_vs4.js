let vsData = {}

let handler = async (m, { conn }) => {
    let chat = m.chat
    if (vsData[chat]) return m.reply('⚠️ Ya hay un VS4 activo. Usa.cerrarvs para cerrar')

    vsData[chat] = {
        players: [],
        suplentes: [],
        sender: m.sender,
        msgId: null
    }

    let texto = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${m.sender.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. Libre
 ▎2. Libre
 ▎3. Libre
 ▎4. Libre
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. Libre
 ▎2. Libre
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${m.sender.split('@')[0]}
┗━━━━━━━━━━━━┛`

    let buttons = [
        { buttonId: '.anotarvs', buttonText: { displayText: '🩷 Anotarme' }, type: 1 },
        { buttonId: '.vervs', buttonText: { displayText: '👀 Ver Lista' }, type: 1 },
        { buttonId: '.cerrarvs', buttonText: { displayText: '🔒 Cerrar' }, type: 1 }
    ]

    let msg = await conn.sendMessage(m.chat, {
        text: texto,
        footer: '© Team Nightwish | Toca Anotarme',
        buttons: buttons,
        headerType: 1,
        mentions: [m.sender]
    })

    vsData[chat].msgId = msg.key.id
}

// Handler para botones
export async function before(m, { conn }) {
    if (!m.isBaileys && m.text.startsWith('.anotarvs')) {
        let chat = m.chat
        let user = m.sender
        let vs = vsData[chat]
        if (!vs) return

        if (vs.players.includes(user) || vs.suplentes.includes(user))
            return m.reply('Ya estás anotado 👀')

        if (vs.players.length < 4) {
            vs.players.push(user)
            m.reply(`✅ @${user.split('@')[0]} anotada como TITULAR`, null, { mentions: [user] })
        } else if (vs.suplentes.length < 2) {
            vs.suplentes.push(user)
            m.reply(`✅ @${user.split('@')[0]} anotada como SUPLENTE`, null, { mentions: [user] })
        } else {
            return m.reply('❌ Lista llena. Esperen a que se libere cupo')
        }

        // Actualizar mensaje
        let p1 = vs.players[0]?.split('@')[0] || 'Libre'
        let p2 = vs.players[1]?.split('@')[0] || 'Libre'
        let p3 = vs.players[2]?.split('@')[0] || 'Libre'
        let p4 = vs.players[3]?.split('@')[0] || 'Libre'
        let s1 = vs.suplentes[0]?.split('@')[0] || 'Libre'
        let s2 = vs.suplentes[1]?.split('@')[0] || 'Libre'

        let update = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${vs.sender.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. @${p1}
 ▎2. @${p2}
 ▎3. @${p3}
 ▎4. @${p4}
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. @${s1}
 ▎2. @${s2}
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${vs.sender.split('@')[0]}
┗━━━━━━━━━━━━┛`

        await conn.sendMessage(chat, {
            text: update,
            footer: '© Team Nightwish | Toca Anotarme',
            buttons: [
                { buttonId: '.anotarvs', buttonText: { displayText: '🩷 Anotarme' }, type: 1 },
                { buttonId: '.vervs', buttonText: { displayText: '👀 Ver Lista' }, type: 1 },
                { buttonId: '.cerrarvs', buttonText: { displayText: '🔒 Cerrar' }, type: 1 }
            ],
            headerType: 1,
            mentions: [vs.sender,...vs.players,...vs.suplentes]
        })
    }

    if (m.text.startsWith('.cerrarvs')) {
        delete vsData[m.chat]
        m.reply('✅ VS4 cerrado')
    }
    if (m.text.startsWith('.vervs')) {
        let vs = vsData[m.chat]
        if (!vs) return m.reply('No hay VS activo')
        m.reply(`Titulares: ${vs.players.length}/4\nSuplentes: ${vs.suplentes.length}/2`)
    }
}

handler.command = /^(vs4)$/i
handler.group = true
export default handler