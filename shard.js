const { ShardingManager } = require(`discord.js`)
const ayarlar = require(`./config.json`)

const shards = new ShardingManager(`./index.js`, {
token : ayarlar.token,
totalShards : 2 })

shards.spawn()