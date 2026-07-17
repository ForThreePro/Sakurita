let toM = a => '@' + a.split('@')[0]

// FUNCION PARA SACAR RANDOM
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

let handler = async (m, { conn, groupMetadata, text, command, usedPrefix }) => {

    // 1. COMANDO:.formartrio.formartrios
    if(['formartrio','formartrios'].includes(command)){
        if(!m.isGroup) return m.reply('Este comando solo funciona en grupos')
        let ps = groupMetadata.participants.map(v => v.id)
        if(ps.length < 3) return m.reply('Se necesitan mínimo 3 personas en el grupo')

        let a = getRandom(ps)
        let b
        do b = getRandom(ps)
        while (b === a)
        let c
        do c = getRandom(ps)
        while (c === a || c === b)

        return m.reply(`*Hey!!! ${toM(a)}, ${toM(b)} y ${toM(c)} han pensado en hacer un trio? ustedes 3 hacen un buen trio 😳😏*`, null, {
            mentions: [a, b, c],
        })
    }

    // 2. COMANDO:.penetrar.penetrado
    if(['penetrar','penetrado'].includes(command)){
        let user = m.mentionedJid[0] || (m.quoted? m.quoted.sender : null)
        if(!user) return m.reply(`*✳️ Menciona a quien deseas penetrar*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        let userName = `@${user.split('@')[0]}`
        const responseMessage = `
*TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!*

*Le ha metido el pene a ${text || userName}* con todo y condón hasta quedar seco, has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraba y luego te ha dejado en silla de ruedas!

*${userName}*
🔥 *YA TE HAN PENETRADO!*`
        return conn.reply(m.chat, responseMessage, null, { mentions: })
    }

    // 3. COMANDO:.follar
    if(command === 'follar'){
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
        if (!who) return m.reply(`*✳️ menciona a quien deseas follar*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        const abrazo = await conn.reply(m.chat, `@${m.sender.split('@')[0]} se esta follando duro a @${who.split('@')[0]}`, m, {mentions: [who, m.sender]})
        return conn.sendMessage(m.chat, {react: {text: '👌🏼', key: abrazo.key}})
    }

    // 4. COMANDO:.nalga
    if(command === 'nalga'){
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
        if (!who) return m.reply(`*✳️ menciona a quien deseas agarrarle la nalga*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        const abrazo = await conn.reply(m.chat, `@${m.sender.split('@')[0]} le esta agarrando la nalga a @${who.split('@')[0]}`, m, {mentions: [who, m.sender]})
        return conn.sendMessage(m.chat, {react: {text: '🍑', key: abrazo.key}})
    }
}

handler.help = ['formartrio', 'penetrar @user', 'follar @user', 'nalga @user']
handler.tags = ['fun']
handler.command = /^(formartrio|formartrios|penetrar|penetrado|follar|nalga)$/i
handler.group = true
export default handler