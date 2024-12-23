import { ClientEvent } from "../..";
import { type Client, Routes } from "discord.js";

class ErrorEvent extends ClientEvent<"ready"> {
  readonly name = "ready";
  async run(c: Client<true>) {
    console.log(`Logado como: ${c.user.tag}!`);

    await c.rest.put(Routes.applicationCommands(c.user.id), {
      body: this.client.commands.map(c => c.slashBuilder.toJSON()),
    });
  }
}

export default ErrorEvent;
