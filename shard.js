const { ShardingManager } = require ('discord.js')
const config = require ('./config.json')
const Discord = require ('discord.js')
const shards = new ShardingManager ('./server.js', {//BURASI ANA DOSYANIZ DEGİİŞİR

token : config.TOKEN,
totalShards : 1 //benim tercihim
});

   const webhookClient = new Discord.WebhookClient("744211739083538463","A0Fu7qxcQWSmROKgd0UPq1Gx7QI0tc58xipMLAv43tXhAYcxUpAVQ57t_MILFoLLbtiW");
shards.on('launch', shard => {
    webhookClient.send(`🟡 [Bot Başlatılıyor] Otorol Proje - <@653957385123266560> \n${shard.id +1} IDli Başlatılıyor Lütfen Bekleyin.`)
    setTimeout(() => {
  webhookClient.send(`🟢  [Bot Başlatıldı] Otorol Proje - <@653957385123266560> \n${shard.id +1} IDli Başlatıldı ve Kullanıma Hazır.`)
  }, 3000)
})

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});
shards.spawn()