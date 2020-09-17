import FlightService from '@main/core/applicationService/flightService';
/* eslint-disable class-methods-use-this */
import { JsonController, Authorized, Get } from 'routing-controllers';

@JsonController('/flights')
@Authorized()
export default class FlightController {
  private flightService = new FlightService();

  @Get()
  async getFlights(): Promise<any> {
    return this.flightService.getFlightDetailsFromAllSources();
  }
}
