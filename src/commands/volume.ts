import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

class VolumeCommand extends Command {
  readonly name = "volume";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Escolha o volume")
    .addNumberOption(option =>
      option.setName("volume").setDescription("O volume a ser escolhido").setMinValue(0).setMaxValue(1000).setRequired(true),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const volume = interaction.options.getNumber("volume", true);
    this.distube.setVolume(interaction, volume);
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription(`Volume em: \`${volume}\``),
      ],
    });
  }
}

export default VolumeCommand;
