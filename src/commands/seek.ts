import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class SeekCommand extends Command {
  readonly name = "seek";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Procura um tempo específico no video/musica")
    .addNumberOption(option =>
      option.setName("time").setDescription("O tempo (em segundos)").setMinValue(0).setRequired(true),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const time = interaction.options.getNumber("time", true);
    this.distube.seek(interaction, time);
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription(`Pulou para \`${time}\` segundos`),
      ],
    });
  }
}
