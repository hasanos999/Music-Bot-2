const { canModifyQueue } = require("../util/EvobotUtil");


module.exports = {
  name: "stop",
  aliases: ["kapat","durdur"],
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send({embed: {"description": `**${message.author} ⏹ Dinledğiniz Şarkıyı Kapattım.**`, "color": "BLUE"}}); 
  }
};
