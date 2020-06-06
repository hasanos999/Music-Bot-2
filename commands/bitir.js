module.exports = {
  name: "stop",
  description: "Dinlediğiniz Şarkıyı Durdurur",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({embed: {"description": `  **Öncelikle Bir Sesli Kanala Girmeniz Gerekiyor!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
    if (!serverQueue) return message.channel.send({embed: {"description": `  **Şuan Hiçbir Müzik Çalmıyor Lütfen Müzik Açın!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send({embed: {"description": `  **⏹ Dinlediğiniz Müziği Kapattım!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "BLUE"}}).catch(console.error);
  }
};
