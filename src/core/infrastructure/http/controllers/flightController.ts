/* eslint-disable class-methods-use-this */
import { JsonController, Authorized, Get } from "routing-controllers";
//import { FlightResponse } from "@main/common/dto/flightResponse";

@JsonController("/flights")
@Authorized()
export default class FlightController {
  @Get()
  async getFlights(): Promise<any> {
    return { success: true };
  }
}
