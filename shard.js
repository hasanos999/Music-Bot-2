const Discord = require('discord.js');
const shard = new Discord.ShardingManager('./server.js', { 
    totalShards: 2, 
    token: 'NjUzOTU3Mzg1MTIzMjY2NTYw.XxM_6g.3Y6RwZsCkkKeS_gOYZ3p7f3h1KU' 
});

shard.spawn(); 

shard.on('launch', shard => {
  console.log(`${shard.id} IDli shard başarıyla başlatıldı gardaşım benim.`)
});

setTimeout(() => {
    console.log("yeniden başlatılıyor..")
    shard.broadcastEval("process.exit()"); 
}, 21600000);