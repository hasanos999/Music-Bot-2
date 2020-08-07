const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "pause",
    aliases: ["duraklat"],
  description: "Çalmakta Olan Müziği Duraklatır",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send({embed: {"description": `**${message.author} ⏸ Dinledğiniz Şarkıyı Duraklattım.**`, "color": "BLUE"}}); 
    }
  }
};
