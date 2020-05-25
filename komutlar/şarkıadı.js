module.exports = {
  name: "şarkıadı",
  description: "Devam eden şarkının adını gönder",
  execute (client, message, args) {
    
      const { channel } = message.member.voice;
    if (!channel) {
     
      return message.channel.send("SES KANALINDA OLMALISINIZ :/");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Bot hiçbir şey oynamıyor");
    }
    
    message.channel.send(serverQueue.songs[0].title)

    
    
    
  }
}
