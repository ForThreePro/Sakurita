let handler = async (m) => {
    const used = process.memoryUsage()
    m.reply(`💻 *CYBER BOT* ➔ Consumo de Sistema\n⚡ *RAM Usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB\n🤖 *Estado:* Sistema estable`) // Cambiado
}
handler.help = ['ram']
handler.tags = ['main']
handler.command = ['ram']
export default handler