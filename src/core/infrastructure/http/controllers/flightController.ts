import FlightService from '@main/core/applicationService/flightService';
/* eslint-disable class-methods-use-this */
import { JsonController, Authorized, Get } from 'routing-controllers';
import Source1ApiAdapter from '../../services/flightSourceBridges/source1Adapter/source1ApiAdapter';
import Source2ApiAdapter from '../../services/flightSourceBridges/source2Adapter/source2ApiAdapter';

@JsonController('/flights')
@Authorized()
export default class FlightController {
  private flightService = new FlightService([new Source1ApiAdapter(), new Source2ApiAdapter()]);

  @Get()
  async getFlights(): Promise<any> {
    return this.flightService.getFlightDetailsFromAllSources();
  }
}
