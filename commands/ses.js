module.exports = {
  name: "volume",
  description: "Change volume of currently playing music",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({embed: {"description": `  **Öncelikle Bir Sesli Kanala Girmeniz Gerekiyor!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
    if (!serverQueue) return message.channel.send({embed: {"description": `  **Şuan Hiçbir Müzik Çalmıyor Lütfen Müzik Açın!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    if (!args[0])
      return message.channel.send(`🔊 Sesi Ayarladım Şuanki Ses Seviyesi **${serverQueue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.channel.send("Lütfen 100 İle 0 Arası Sayı Yazın.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.channel.send({embed: {"description": `  **"Lütfen 100 İle 0 Arası Sayı Yazın."**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return serverQueue.textChannel.send({embed: {"description": `  **Şarkının Sesini **${args[0]}%** Ayarladım**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
  }
};
