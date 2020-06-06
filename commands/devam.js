module.exports = {
  name: "resume",
  description: "Resume currently playing music",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({embed: {"description": `  **Öncelikle Bir Sesli Kanala Girmeniz Gerekiyor!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send({embed: {"description": `  **${message.author} ▶ Duraklatılan Şarkıya Devam Ediyorum!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
    }
    return message.channel.send({embed: {"description": `  **Oynatılan Şarkıyı Bulamadım Lütfen Şarkı Açın.**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
  }
};
