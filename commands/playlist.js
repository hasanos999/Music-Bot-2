const { MessageEmbed } = require("discord.js");
const { play } = require("../include/play");
const { YOUTUBE_API_KEY, MAX_PLAYLIST_SIZE } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "playlist",
  cooldown: 3,
  aliases: ["pl","oynatma-listesi","oynatmalistesi"],
  description: "Youtube'dan Bir Oynatma Listesi Oynatın",
  async execute(message, args) {
    const { PRUNING } = require("../config.json");
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);

    if (!args.length)
      return message.channel.send({embed: {"description": `**Kullanım Şekli: ${message.client.prefix}playlist (Youtube Playlist), (Playlist İsmi), (Soundcloud Playlist).**`, "color": "BLUE"}}); 
    if (!channel) return message.channel.send({embed: {"description": `**Öncelikle Bir Sesli Kanala Katılmanız Gerekiyor.**`, "color": "BLUE"}}); 

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send({embed: {"description": `**Odaya Katılmıyorum İzinim Yok Lütfen Yetkilileri Uyarın.**`, "color": "BLUE"}}); 
    if (!permissions.has("SPEAK"))
      return message.channel.send({embed: {"description": `**Odaya Katıldım Fakat Konuşma İznim Yok Lütfen Yetkilileri Uyarın.**`, "color": "BLUE"}}); 

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 75,
      playing: true
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 50, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.reply("PlayList'i Bulamadım :(").catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 50, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.reply("PlayList'i Bulamadım :(").catch(console.error);
      }
    }

    videos.forEach((video) => {
      song = {
        title: video.title,
        url: video.url,
        duration: video.durationSeconds
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
        if (!PRUNING)
          message.channel
            .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
            .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    let playlistEmbed = new MessageEmbed()
      .setTitle(`${playlist.title}`)
      .setURL(playlist.url)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (!PRUNING) {
      playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song.title}`));
      if (playlistEmbed.description.length >= 2048)
        playlistEmbed.description =
          playlistEmbed.description.substr(0, 2007) + "\n**PlayList'in Adı Çok Uzun**...";
    }

    message.channel.send(`${message.author} **PlayList Başlatılıyor**`, playlistEmbed);

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`**Kanala Katılamadım**: ${error}`).catch(console.error);
      }
    }
  }
};
