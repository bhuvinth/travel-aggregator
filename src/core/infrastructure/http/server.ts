import "reflect-metadata";
import AppConfig from "@config/appConfig";
import { createExpressServer } from "routing-controllers";

import authenticationHelper from "./authenticationHelper";
import flightController from "./controllers/flightController";

createExpressServer({
  authorizationChecker: authenticationHelper,
  routePrefix: "/api",
  controllers: [flightController],
  middlewares: [],
  defaultErrorHandler: true
}).listen(AppConfig.serverPort, async () => {
  console.log(
    `App listening on the http://localhost:${AppConfig.serverPort} 🚀`
  );
});
