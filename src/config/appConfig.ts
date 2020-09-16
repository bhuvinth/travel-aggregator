import * as env from "env-var";
import * as dotenvsafe from "dotenv-safe";

dotenvsafe.config();

export default class AppConfig {
  public static authToken = env
    .get("AUTH_TOKEN")
    .required()
    .asString();

  public static serverPort = env
    .get("PORT")
    .default(5000)
    .asIntPositive();
}
