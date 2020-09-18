import FlightService from '@main/core/applicationService/flightService';
/* eslint-disable class-methods-use-this */
import { JsonController, Authorized, Get, UseBefore } from 'routing-controllers';

const timeout = require('connect-timeout');

@JsonController('/flights')
@Authorized()
export default class FlightController {
  private flightService = new FlightService();

  @Get()
  @UseBefore(timeout('1000'))
  async getFlights(): Promise<any> {
    return this.flightService.getFlightDetailsFromAllSources();
  }
}
