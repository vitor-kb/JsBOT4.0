import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { defaultFilters } from "distube";

export default class FilterCommand extends Command {
  readonly name = "filtro";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("filtro")
    .setDescription("Escolha o filtro")
    .addStringOption(option =>
      option
        .setName("filtro")
        .setDescription("Filtro a ser escolhido")
        .setRequired(true)
        .addChoices(...Object.keys(defaultFilters).map(k => ({ name: k, value: k }))),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const filter = interaction.options.getString("filtro", true);
    const filters = this.distube.getQueue(interaction)!.filters;
    if (filters.has(filter)) filters.remove(filter);
    else filters.add(filter);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle("JsBOT4.0")
          .setDescription(`Filtro atual: \`${filters.names.join(", ") || "Off"}\``),
      ],
    });
  }
}
