const discord = require("discord.js");

module.exports = {
  name: "bitir",
  description: "Müziği durdur",
  execute(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) {
   
      return message.channel.send("SES KANALINDA OLMALISINIZ: /");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Oynatabileceğim hiçbir şey yok");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

    serverQueue.textChannel.send("**Müzik çalarak şarkı formunu durdurdu**");
  }
};
