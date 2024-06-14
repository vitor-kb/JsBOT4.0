import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class StopCommand extends Command {
  readonly name = "stop";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("stop").setDescription("Para a fila");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await this.distube.stop(interaction);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription("Fila zerada!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Red").setTitle("JsBOT4.0").setDescription(`Erro: \`${e}\``)],
      });
    }
  }
}
