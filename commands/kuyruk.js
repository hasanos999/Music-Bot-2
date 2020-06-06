module.exports = {
  name: "queue",
  description: "Show the music queue and now playing.",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send({embed: {"description": `  **Oynatılan Şarkıyı Bulamadım Lütfen Şarkı Açın.**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
    return message
      .channel.send({embed: {"description": `  **📃 **R3LEASE |KUYRUK**

${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}

Now playing: **${serverQueue.songs[0].title}****  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}})
        { split: true }
  }
};
