module.exports = {
  name: "durdur",
  description: "şarkıyı duraklat",
  execute (client, message, args) {
  const { channel } = message.member.voice;
    if (!channel) {
      
      return message.channel.send("SES KANALINDA OLMALISINIZ: /");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Duraklayabildiğim hiçbir şey çalmıyor");
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      
      return message.channel.send("✅ | Çalmakta Olan Şarkıyı Duraklattı")
  }  
  }
}
