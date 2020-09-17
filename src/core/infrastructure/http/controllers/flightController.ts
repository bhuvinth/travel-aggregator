import FlightService from '@main/core/applicationService/flightService';
/* eslint-disable class-methods-use-this */
import { JsonController, Authorized, Get } from 'routing-controllers';
import SupplyPartner1ApiAdapter from '../../services/flightSourceBridges/source1Adapter/supplyPartner1ApiAdapter';
import SupplyPartner2ApiAdapter from '../../services/flightSourceBridges/source2Adapter/supplyPartner2ApiAdapter';

@JsonController('/flights')
@Authorized()
export default class FlightController {
  private flightService = new FlightService([
    new SupplyPartner1ApiAdapter(),
    new SupplyPartner2ApiAdapter(),
  ]);

  @Get()
  async getFlights(): Promise<any> {
    return this.flightService.getFlightDetailsFromAllSources();
  }
}
