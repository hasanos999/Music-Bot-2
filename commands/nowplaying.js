const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np",
    aliases: ["nowplaying","çalan"],
  description: "O Anki Çalan Şarkıyı Gösterir",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    const song = queue.songs[0];

    let nowPlaying = new MessageEmbed()
      .setTitle("**Şu Anki Çalan**")
      .setDescription(`**${song.title}\n${song.url}**`)
      .setColor("BLUE")
      .setAuthor("Müzik")
      .setTimestamp();

    if (song.duration > 0) nowPlaying.setFooter(new Date(song.duration * 1000).toISOString().substr(11, 8));

    return message.channel.send(nowPlaying);
  }
};


