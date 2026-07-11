import fs from 'fs'
import path from 'path'

const dbPath = path.join('./database', 'sorteos.json')
if (!fs.existsSync('./database')) fs.mkdirSync('./database')
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, '{}')

const DIAS = ['lunes','martes','miercoles','jueves','viernes','sabado']
const TZ = 'America/Lima'

const cargarDB = () => JSON.parse(fs.readFileSync(dbPath))
const guardarDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
const getHoy = () => {
    let dia = new Date().toLocaleString('es-PE', {timeZone: TZ, weekday: 'long'}).toLowerCase()
    dia = dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return dia === 'domingo'? 'extra' : dia
}

const EMOJIS_DIA = {
    lunes: '🌙', martes: '🌙', miercoles: '🌙', jueves: '🌙',
    viernes: '🌙', sabado: '🌙', extra: '⛈️'
}

let handler = async (m, { conn, args, command, isAdmin }) => {
    let gid = m.chat
    let data = cargarDB()
    if(!data[gid]) data[gid] = {lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[], extra:[]}

    let hoy = getHoy()
    let texto = args.join(' ')

    // =====.v ===== DISEÑO TEAM NIGHTWISH
    if(command === 'v'){
        let msg = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⚡ *SISTEMA DE SORTEOS* ⚡
│ 🌙 *Bot:* Rayo Prem
╰─────────────────❒\n\n`

        for(let d of [...DIAS, 'extra']){
            msg += `╭─── ${EMOJIS_DIA[d]} ${d.toUpperCase()} ───╮\n`
            if(data[gid][d].length === 0) {
                msg += `│ ❄️ _Sin participantes_\n`
            } else {
                data[gid][d].forEach((u,i) => {
                    msg += `│ 🌩️ ${i+1}️⃣ *${u.nombre}*\n`
                    msg += `│ 📱 \`${u.numero}\`\n`
                    msg += `│ 🎁 Premio: *${u.premio}*\n`
                    msg += `│ ─────────────────\n`
                })
            }
            msg += `╰───────────────────╯\n\n`
        }

        msg += `╭─❒ *『 COMANDOS 』* ❒\n`
        msg += `│ ⚡ *.list* Nombre / Numero / Premio\n`
        msg += `│ ⛈️ *.extra* Nombre / Numero / Premio\n`
        msg += `│ 🗑️ *.delall* Borrar todo [Admin]\n`
        msg += `│ 📊 *.v* Ver esta lista\n`
        msg += `╰─────────────────❒\n\n`
        msg += `> *“El trueno que sortea en la noche”* 🌙\n`
        msg += `> *© Team Nightwish*`

        return conn.reply(m.chat, msg, m)
    }

    // =====.list =====
    if(command === 'list'){
        if(hoy === 'extra') return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⛈️ *ERROR*\n│ Domingo solo se anota en *EXTRA*\n╰─────────────────❒`, m)

        let [nombre, numero, premio] = texto.split('/').map(x => x.trim())
        numero = numero?.replace(/[^0-9]/g, '')

        if(!nombre ||!numero ||!premio) return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⚡ *FORMATO INCORRECTO*\n│\n│ *Ejemplo:*\n│.list Whois / 936994155 / Bot mensual\n╰─────────────────❒`, m)

        for(let d of Object.keys(data[gid])){
            data[gid][d] = data[gid][d].filter(u => u.numero!== numero)
        }

        data[gid][hoy].push({nombre, numero, premio})
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ✅ *¡ANOTADO CON ÉXITO!*\n│\n│ 👤 *Nombre:* ${nombre}\n│ 📱 *Número:* ${numero}\n│ 🎁 *Premio:* ${premio}\n│ 📅 *Día:* ${hoy.toUpperCase()}\n│\n│ 🌙 *Que gane el mejor*\n╰─────────────────❒`, m)
    }

    // =====.extra =====
    if(command === 'extra'){
        let [nombre, numero, premio] = texto.split('/').map(x => x.trim())
        numero = numero?.replace(/[^0-9]/g, '')

        if(!nombre ||!numero ||!premio) return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⛈️ *FORMATO INCORRECTO*\n│\n│ *Ejemplo:*\n│.extra Juan / 999888777 / 20 soles\n╰─────────────────❒`, m)

        for(let d of Object.keys(data[gid])){
            data[gid][d] = data[gid][d].filter(u => u.numero!== numero)
        }

        data[gid].extra.push({nombre, numero, premio})
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⛈️ *ANOTADO EN EXTRA*\n│\n│ 👤 *Nombre:* ${nombre}\n│ 📱 *Número:* ${numero}\n│ 🎁 *Premio:* ${premio}\n│\n│ ⚡ *Premio del trueno nocturno*\n╰─────────────────❒`, m)
    }

    // =====.delall =====
    if(command === 'delall'){
        if(!isAdmin) return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🛡️ *ERROR*\n│ Solo *ADMINS* pueden usar esto\n╰─────────────────❒`, m)
        data[gid] = {lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[], extra:[]}
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🗑️ *LIMPIEZA COMPLETA*\n│\n│ ⚡ Lista reseteada: Lunes a Sábado + Extra\n│ 🌙 *Grupo listo para empezar de 0*\n╰─────────────────❒`, m)
    }
}

handler.help = ['v Ver lista','list Nombre / Numero / Premio','extra Nombre / Numero / Premio','delall Borrar todo [Admin]']
handler.tags = ['sorteos']
handler.command = ['v','list','extra','delall']
handler.group = true
export default handler