const ytdlDiscord = require("ytdl-core-discord");

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel.send({embed: {"description": `<a:carp:715013539676291085>  **🚫 Müzik sırası sona erdi.**  <a:carp:715013539676291085> `, "color": "#ff2050"}}).catch(console.error);


    }

    try {
      var stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes("copyright")) {
        return message.channel
          .send("⛔ A video could not be played due to copyright protection ⛔")
          .catch(console.error);
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", err => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 50);
    const serverQueue = message.client.queue.get(message.guild.id);
    try {
      var playingMessage = await queue.textChannel.send({embed: {"description": `**R3LEASE | 🎧 Müzik Başladı 🎧 \nBaşlık\n [${song.title}](${song.url}) \n Sarkıyı Açan \n ${message.author}\nSes Seviyesi \n${serverQueue.volume}%**`, "color": "#ff2050"}});
     await playingMessage.react;
     await playingMessage.react("🎵");

    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    const collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      // Stop if there is no queue on the server
      if (!queue) return;

      switch (reaction.emoji.name) {
        case "":
          queue.connection.dispatcher.end();
          queue.textChannel.send({embed: {"description": `  **⏩ Şarkıyı atladı **  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);



          collector.volume();
          break;

        case "volume":
          if (!queue.playing) break;
          queue.playing = false;
          queue.connection.dispatcher.pause();
          queue.textChannel.send({embed: {"description": `  **⏸ Müziği duraklattı.**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

          reaction.users.remove(user);
          break;

        case "":
          if (queue.playing) break;
          queue.playing = true;
          queue.connection.dispatcher.resume();
          queue.textChannel.send({embed: {"description": `  **▶ Müziğe devam etti!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);

          reaction.users.remove(user);
          break;

        case "":
          queue.loop = !queue.loop;
          queue.textChannel.send({embed: {"description": `Döngü şimdi ${queue.loop ? "<a:b_yes:714437257385213994>" : "<a:carp:715013539676291085>"} `, "color": "#ff2050"}}).catch(console.error);


          reaction.users.remove(user);
          break;

        case "":
          queue.songs = [];
          queue.textChannel.send({embed: {"description": `  **⏹ Müziği durdurdu!**  <a:b_yes:714437257385213994>  [${message.author}]"`, "color": "#ff2050"}}).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll();
    });
  }
};
