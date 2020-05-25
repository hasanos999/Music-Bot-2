module.exports = {
  name: "geç",
  description: "Şarkıyı atlayın veya şarkıyı bir sonrakine kaydırın",
  execute(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
      
      return message.channel.send("SES KANALINDA OLMALISINIZ: /");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Atlayabileceğim hiçbir şey çalmıyor");
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send("✔ | Şarkıyı Atladınız.");
  }
};
