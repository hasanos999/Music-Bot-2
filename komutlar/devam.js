module.exports = {
  name: "devam", 
  description: "Duraklatılmış Şarkıyı devam ettir",
  execute (client, message, args) {
      const { channel } = message.member.voice;
    if (!channel) {
     
      return message.channel.send("SES KANALINDA OLMALISINIZ: /");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  
  return message.channel.send("✅ | Duraklatılmış Şarkıyı Sürdürdü") 
 }
    
    message.channel.send("Devam edebileceğim duraklatılmış bir şey yok")
    
  }
}
