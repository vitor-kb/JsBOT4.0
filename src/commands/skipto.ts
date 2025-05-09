import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

class SkipToCommand extends Command {
  readonly name = "skipto";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Pula para uma posicao especifica")
    .addIntegerOption(option => option.setName("position").setDescription("Position to skip to").setRequired(true));
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const position = interaction.options.getInteger("position", true);
      const song = await this.distube.jump(interaction, position);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setTitle("JsBOT4.0")
            .setDescription(`Skipped to \`${song.name || song.url}\``),
        ],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Red").setTitle("JsBOT4.0").setDescription(`Erro: \`${e}\``)],
      });
    }
  }
}

export default SkipToCommand;
