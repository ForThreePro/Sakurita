import os from 'os'

let handler = async (m) => {
    let cpu = os.loadavg()[0].toFixed(2)
    m.reply(`🌸╭─── SAKURITA BOT ───╮🌸
│ 🌷 *MONITOR DEL JARDÍN*
│
│ 🌸 *Carga Actual:* ${cpu}%
│ 🌷 *Estado:* Regando pétalos
╰───────────────────────╯`)
}

handler.help = ['cpu']
handler.tags = ['main']
handler.command = ['cpu']

export default handler