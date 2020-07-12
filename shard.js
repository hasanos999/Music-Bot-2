const { ShardingManager } = require(`discord.js`)
const config = require(`./config.json`)

const shards = new ShardingManager(`./server.js`, {
token : config.token,
totalShards : 2 })

shards.spawn()