import { Events } from "distube";
import { EmbedBuilder } from "discord.js";
import { DisTubeEvent, type Metadata } from "../..";
import type { Playlist, Queue } from "distube";

class AddListEvent extends DisTubeEvent<Events.ADD_LIST> {
  readonly name = Events.ADD_LIST;
  run(_queue: Queue, playlist: Playlist<Metadata>) {
    playlist.metadata.interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle("JsBOT4.0")
          .setDescription(`Adicionado \`${playlist.name}\` (${playlist.songs.length} musicas) para a fila`),
      ],
    });
  }
}

export default AddListEvent;
