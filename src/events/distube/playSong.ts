import { Events } from "distube";
import { EmbedBuilder } from "discord.js";
import { DisTubeEvent, type Metadata, followUp } from "../..";
import type { Queue, Song } from "distube";

export default class PlaySongEvent extends DisTubeEvent<Events.PLAY_SONG> {
  readonly name = Events.PLAY_SONG;
  run(queue: Queue, song: Song<Metadata>) {
    followUp(
      song.metadata.interaction,
      new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription(`Tocando: \`${song.name}\``),
      queue.textChannel!,
    ).catch(console.error);
  }
}
