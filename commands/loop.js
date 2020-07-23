const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ["döngü","tekrar"],
  description: "Müzik Tekrarlama",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member)) return;
    queue.loop = !queue.loop;
    return queue.textChannel.send({embed: {"description": `**Döngü Sistemi ${queue.loop ? "**Açık**" : "**Kapalı**"}**`, "color": "BLUE"}}); 
  }
};
//Oyun Craft Abone Ol R3lease Kalp