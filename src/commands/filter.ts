import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { defaultFilters } from "distube";

export default class FilterCommand extends Command {
  readonly name = "filter";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("filter")
    .setDescription("Set the filter")
    .addStringOption(option =>
      option
        .setName("filter")
        .setDescription("Filtro a ser selecionado")
        .setRequired(true)
        .addChoices(...Object.keys(defaultFilters).map(k => ({ name: k, value: k }))),
    );
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const filter = interaction.options.getString("filter", true);
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
