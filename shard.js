const { ShardingManager } = require ('discord.js')
const ayarlar = require ('./ayarlar.json')
const Discord = require ('discord.js')
const shards = new ShardingManager ('./bot.js', {//BURASI ANA DOSYANIZ DEGİİŞİR

token : ayarlar.token,
totalShards : 1 //benim tercihim

});

    const webhook = new Discord.WebhookClient("737306125153861762","WZM98KehW-COwsti5rLBU_idj5EnDNEkoEGyNan-4h21A66Y3ULyD00JxWLrrf0IDftL")

shards.on('launch', shard => {

    webhook.send(`🟡 [Başlatılıyor] Müzik Proje - <@653957385123266560> \n${shard.id +1} IDli Başlatılıyor Lütfen Bekleyin.`)
    setTimeout(() => {
  webhook.send(`🟢  [Başlatıldı] Müzik Proje - <@653957385123266560> \n${shard.id +1} IDli Başlatıldı ve Kullanıma Hazır.`)
  }, 3000)
})
shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn()