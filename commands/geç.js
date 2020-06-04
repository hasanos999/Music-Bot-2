module.exports = {
  name: "skip",
  description: "Skip the currently playing song",
  async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send("Öncelikle Bir Ses Kanalına Katılmanız Gerekiyor!").catch(console.error);
    if (!serverQueue)
      return message.channel.send("Oynatılan Şarkıyı Bulamadım Lütfen Şarkı Açın Yoksa Geçemem.").catch(console.error);

    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏭ Dinlediğiniz Şarkıyı Geçtim`).catch(console.error);
  }
};
