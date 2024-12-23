import { DisTubeEvent } from "../..";
import { EmbedBuilder } from "discord.js";
import { Events, type Queue } from "distube";

class FinishEvent extends DisTubeEvent<Events.FINISH> {
  readonly name = Events.FINISH;
  run(queue: Queue) {
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setColor("Blue").setTitle("JsBOT4.0").setDescription("Fila finalizada!")],
    });
    queue.voice.leave();
  }
}

export default FinishEvent;