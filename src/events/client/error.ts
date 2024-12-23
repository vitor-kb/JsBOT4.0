import { ClientEvent } from "../..";

class ErrorEvent extends ClientEvent<"error"> {
  readonly name = "error";
  run(error: Error) {
    console.error(error);
  }
}

export default ErrorEvent;