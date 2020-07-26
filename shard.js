const { ShardingManager } = require(`discord.js`)
const ayarlar = require(`./config.json`)

const shards = new ShardingManager(`./server.js`, {
token : ayarlar.token,
totalShards : 1 })

shards.spawn()