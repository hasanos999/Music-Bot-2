module.exports = {
  name: "kuyruk",
  description: "eklenen şarkıların listesini al",
  execute: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {

      return message.channel.send("SES KANALINDA OLMALISINIZ: /");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Kuyrukta hiçbir şey yok");
    }

    message.channel.send(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  }
};
