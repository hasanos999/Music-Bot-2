const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v",'ses'],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member))
      return message.channel.send({embed: {"description": `**Öncelikle Bir Sesli Kanala Katılmanız Gerekiyor.**`, "color": "BLUE"}}); 

    if (!args[0]) return message.channel.send({embed: {"description": `**🔊 Ses Seviyesi Ayarlandı: **${queue.volume}%**.**`, "color": "BLUE"}}); 
    if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
    if (parseInt(args[0]) > 150 || parseInt(args[0]) < 0)
      return message.channel.send({embed: {"description": `**Lütfen 150 - 1 Arası Sayı Yazın.**`, "color": "BLUE"}}); 

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 150);

    return queue.textChannel.send({embed: {"description": `**Ses Şiddeti **${args[0]}%**.**`, "color": "BLUE"}}); 
  }
};
//Oyun Craft Abone Ol R3lease Kalp