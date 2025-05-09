import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

class AutoplayCommand extends Command {
  readonly name = "autoplay";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("autoplay").setDescription("Liga o autoplay");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setTitle("JsBOT4.0")
            .setDescription(`Autoplay: \`${this.distube.toggleAutoplay(interaction) ? "On" : "Off"}\``),
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

export default AutoplayCommand;
