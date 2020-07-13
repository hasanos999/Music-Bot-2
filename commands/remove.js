const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
    aliases: ["kaldır","sıra-kaldır",'sırakaldır'],
  description: "Remove song from the queue",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({embed: {"description": `**Sırada Şarkı Bulunamadı.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.channel.send({embed: {"description": `**Kullanım Şekli: ${message.client.prefix}remove <Sıra Numarası>.**`, "color": "BLUE"}}); 
    if (isNaN(args[0])) return message.channel.send({embed: {"description": `**Kullanım Şekli: ${message.client.prefix}remove <Sıra Numarası>.**`, "color": "BLUE"}});

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send({embed: {"description": `**${message.author} ❌ Kaldırıldı **${song[0].title}** Kuyruktan.**`, "color": "BLUE"}}); 
  }
};
//Oyun Craft Abone Ol R3lease Kalp