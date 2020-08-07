const { ShardingManager } = require ('discord.js')
const config = require ('./config.json')
const Discord = require ('discord.js')
const shards = new ShardingManager ('./server.js', {//BURASI ANA DOSYANIZ DEGİİŞİR

token : config.TOKEN,
totalShards : 1 //benim tercihim
});

   const webhookClient = new Discord.WebhookClient("737306125153861762","WZM98KehW-COwsti5rLBU_idj5EnDNEkoEGyNan-4h21A66Y3ULyD00JxWLrrf0IDftL");
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