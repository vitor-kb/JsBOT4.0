import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

class SkipCommand extends Command {
  readonly name = "skip";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("skip").setDescription("Pula a musica atual");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const song = await this.distube.skip(interaction);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setTitle("JsBOT4.0")
            .setDescription(`Pulou para \`${song.name || song.url}\``),
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

export default SkipCommand;
