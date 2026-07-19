let handler = async (m) => {
    const used = process.memoryUsage()
    m.reply(`🌸 *SAKURITA BOT* ➔ Consumo del Jardín
🌷 *RAM Usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
🌸 *Estado:* El jardín está floreciendo`)
}
handler.help = ['ram']
handler.tags = ['main']
handler.command = ['ram']
export default handler