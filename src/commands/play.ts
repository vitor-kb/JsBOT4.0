import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Metadata } from "..";
import type { ChatInputCommandInteraction } from "discord.js";

export default class PlayCommand extends Command {
  readonly name = "play";
  override readonly inVoiceChannel = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca música de uma URL suportada ou insira um texto para procura.")
    .addStringOption(opt => opt.setName("url/texto").setDescription("Uma URL suportada ou texto para procura").setRequired(true))
    .addBooleanOption(opt =>
      opt.setName("skip").setDescription("Pula a musica atual").setRequired(false),
    )
    .addIntegerOption(opt =>
      opt.setName("position").setDescription("A posicao vai ser adicionada a fila").setRequired(false),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const input = interaction.options.getString("url/texto", true);
    const skip = interaction.options.getBoolean("skip", false) ?? false;
    const position = interaction.options.getInteger("position", false) ?? undefined;
    const vc = interaction.member?.voice?.channel;
    if (!vc) return; // Handled by inVoiceChannel property
    await interaction.deferReply();
    this.client.distube
      .play<Metadata>(vc, input, {
        skip,
        position,
        textChannel: interaction.channel ?? undefined,
        member: interaction.member,
        metadata: { interaction },
      })
      .catch(e => {
        console.error(e);
        interaction.editReply({
          embeds: [
            new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription(`Erro: \`${e.message}\``),
          ],
        });
      });
  }
}
