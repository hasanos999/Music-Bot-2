const Discord = require('discord.js');
const shard = new Discord.ShardingManager('./server.js', { 
    totalShards: 2, 
    token: 'NjUzOTU3Mzg1MTIzMjY2NTYw.XxSDlA.BrmG_H4sSDtOBeCzR8qPoN_yFjk' 
});

shard.spawn(); 

shard.on('launch', shard => {
  console.log(`${shard.id} IDli shard başarıyla başlatıldı gardaşım benim.`)
});

setTimeout(() => {
    console.log("yeniden başlatılıyor..")
    shard.broadcastEval("process.exit()"); 
}, 21600000);