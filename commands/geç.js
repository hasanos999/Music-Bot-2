module.exports = {
  name: "skip",
  description: "Skip the currently playing song",
  async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({embed: {"description": `  **"Öncelikle Bir Ses Kanalına Girmeniz Gerekiyor!"** <:crossmark_274c:706879392181125150>"  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
    if (!serverQueue)
      return message.channel.send({embed: {"description": `  **Oynatılan Şarkıyı Bulamadım Lütfen Şarkı Açın Yoksa Geçemem.**  <:crossmark_274c:706879392181125150> [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send({embed: {"description": `  **${message.author} ⏭ Dinlediğiniz Şarkıyı Geçtim**  <:pngresmi:706880851022970930> [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
  }
};