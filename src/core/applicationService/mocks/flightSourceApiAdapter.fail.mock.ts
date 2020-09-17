/* eslint-disable class-methods-use-this */
import { Flights } from '@main/common/dto/flights';
import FlightSourceApiInterface from '@main/core/infrastructure/services/flightSourceBridges/flightSourceApiInteface';

export default class FlightSourceApiAdapterFailedResponse implements FlightSourceApiInterface {
  public async getFlightDetails(): Promise<Flights[]> {
    throw new Error('Failed to fetch data');
  }
}
