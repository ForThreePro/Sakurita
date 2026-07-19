import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

global.owner = [
  [ '51936994155', 'Barboza OFC 🌃', true ],
  [ '528621029907', 'Jota 🐼', true ]
]

global.mods = []
global.prems = []

// 🌸 DISEÑO SAKURITA BOT 🌸
global.packname = `🌸  SAKURITA BOT  🌸`
global.author = 'By Yallico 🌷'
global.stickpack = '© SAKURITA BOT 🌸'
global.stickauth = 'By Yallico 🌷'
global.wm = 'SAKURITA 🌸'
global.botname = '[ SAKURITA BOT 🌸 ]'
global.textbot = `🌷 Powered by Pétalos Digitales`
global.dev = '• Powered by Sakurita Community 🌸'
global.wait = '🌸 *Aguarda un momentito... recolectando pétalos* 🌷\n\n> *SAKURITA BOT 🌸*'
global.listo = '*🌸 Aquí tienes Yallico 🌷*'
global.namechannel = 'SAKURITA BOT 🌸'
global.channel = 'https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18'

global.rayo = fs.readFileSync('./storage/img/rayo.jpg')

global.group = 'https://chat.whatsapp.com/CBuLXuVZcg9FEfCSHiY6b0'
global.canal = 'https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18'
global.insta = 'https://www.insta.com/sebastian_barboza13'

global.estilo = { 
  key: { 
    fromMe: false, 
    participant: `0@s.whatsapp.net`, 
    ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) 
  }, 
  message: { 
    orderMessage: { 
      itemCount: -999, 
      status: 1, 
      surface: 1, 
      message: global.packname, 
      orderTitle: 'Bang', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.jadi = 'Sesiones/Subbots'
global.Sesion = 'Sesiones/Principal'
global.dbname = 'database.json'

global.multiplier = 69 
global.maxwarn = '2' 

global.APIs = {
  amel: 'https://melcanz.com',
  bx: 'https://bx-hunter.herokuapp.com',
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  nzcha: 'http://nzcha-apii.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  fdci: 'https://api.fdci.se',
  dzx: 'https://api.dhamzxploit.my.id',
  bsbt: 'https://bsbt-api-rest.herokuapp.com',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.me',
  hardianto: 'https://hardianto-chan.herokuapp.com',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  adiisus: 'https://adiixyzapi.herokuapp.com',
  lol: 'https://api.lolhuman.xyz',
  fgmods: 'https://api-fgmods.ddns.net',
  Velgrynd: 'https://velgrynd.herokuapp.com',
  rey: 'https://server-api-rey.herokuapp.com',
  shadow: 'https://api.reysekha.xyz',
  apialc: 'https://api-alc.herokuapp.com',
  botstyle: 'https://botstyle-api.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  ana: 'https://anabotofc.herokuapp.com/',
  kanx: 'https://kannxapi.herokuapp.com/',
  dhnjing: 'https://dhnjing.xyz'
}

global.APIKeys = {
  'https://api-alc.herokuapp.com': 'ConfuMods',
  'https://api.reysekha.xyz': 'apirey',
  'https://melcanz.com': 'F3bOrWzY',
  'https://bx-hunter.herokuapp.com': 'Ikyy69',
  'https://api.xteam.xyz': '5bd33b276d41d6b4',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://bsbt-api-rest.herokuapp.com': 'benniismael',
  'https://api.zeks.me': 'apivinz',
  'https://hardianto-chan.herokuapp.com': 'hardianto',
  'https://pencarikode.xyz': 'pais',
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://leyscoders-api.herokuapp.com': 'MIMINGANZ',
  'https://server-api-rey.herokuapp.com': 'apirey',
  'https://api.lolhuman.xyz': 'GataDiosV2',
  'https://botstyle-api.herokuapp.com': 'Eyar749L',
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://anabotofc.herokuapp.com/': 'AnaBot'
} 

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🌸 Update 'config.js' SAKURITA 🌸"))
  import(`${file}?update=${Date.now()}`)
})