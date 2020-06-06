module.exports = {
  name: "loop", 
  description: "Toggle music loop",
  async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send({embed: {"description": `  **Oynatılan Şarkıyı Bulamadım Lütfen Şarkı Açın.**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

    // toggle from false to true and reverse
    serverQueue.loop = !serverQueue.loop;
    return serverQueue.textChannel
      .send({embed: {"description": `  **Döngü Sistemi ${serverQueue.loop ? "**Döngü Açıldı**" : "**Döngü Kapatıldı**"}**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}})
      .catch(console.error);
  }
};
