import * as env from 'env-var';
import * as dotenvsafe from 'dotenv-safe';

dotenvsafe.config();

export default class AppConfig {
  public static authToken = env
    .get('AUTH_TOKEN')
    .required()
    .asString();

  public static serverPort = env
    .get('PORT')
    .default(5000)
    .asIntPositive();

  public static source1APIConfiguration = {
    url: env
      .get('SOURCE1_API_URL')
      .required()
      .asString(),
    timeout: env
      .get('SOURCE1_TIMEOUT_IN_MILLISECONDS')
      .required()
      .asIntPositive(),
    username: env
      .get('SOURCE1_USERNAME')
      .required()
      .asString(),
    password: env
      .get('SOURCE1_PASSWORD')
      .required()
      .asString(),
  };

  public static source2APIConfiguration = {
    url: env
      .get('SOURCE2_API_URL')
      .required()
      .asString(),
    timeout: env
      .get('SOURCE2_TIMEOUT_IN_MILLISECONDS')
      .required()
      .asIntPositive(),
    username: env
      .get('SOURCE2_USERNAME')
      .required()
      .asString(),
    password: env
      .get('SOURCE2_PASSWORD')
      .required()
      .asString(),
  };
}
