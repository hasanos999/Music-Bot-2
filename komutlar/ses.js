module.exports = {
  name: "ses",
  description: "Şarkıyı atlayın veya şarkıyı bir sonrakine kaydırın",
  execute(client, message, args) {
   		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Lütfen Bir Ses Kanalına Giriniz Aksi Taktirde Bu Komut Çalışmaz.!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Çalan Bir Şarkı Bulunamadı');
		if (!args[0]) return message.channel.send(`Ses Seviyesi: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; 
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`Ayarlanan Ses Seviyesi: **${args[0]}**`);
  }
};
