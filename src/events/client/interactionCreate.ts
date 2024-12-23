import { ClientEvent } from "../..";
import type { Interaction } from "discord.js";

class InteractionCreateEvent extends ClientEvent<"interactionCreate"> {
  readonly name = "interactionCreate";
  async run(interaction: Interaction) {
    if (!interaction.inCachedGuild()) return;
    if (interaction.isChatInputCommand()) {
      const cmd = this.client.commands.get(interaction.commandName);
      if (!cmd) return;
      if (cmd.inVoiceChannel && !interaction.member.voice.channel) {
        interaction.reply("Você precisa estar em um canal de voz para usar esse comando!");
        return;
      }
      if (cmd.playing && !this.distube.getQueue(interaction)) {
        interaction.reply("Uma musica precisa estar tocando para usar esse comando!");
        return;
      }
      await cmd.onChatInput(interaction);
    }
  }
}

export default InteractionCreateEvent;