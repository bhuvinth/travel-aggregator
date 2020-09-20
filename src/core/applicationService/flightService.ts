/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Flights } from '@main/common/dto/flights';
import Logger from '@main/utils/logger';
import FlightSourceApiInterface from '@core/infrastructure/services/flightSourceBridges/flightSourceApiInteface';
import SupplyPartner1ApiAdapter from '@core/infrastructure/services/flightSourceBridges/supplyPartner1Adapter/supplyPartner1ApiAdapter';
import SupplyPartner2ApiAdapter from '@main/core/infrastructure/services/flightSourceBridges/supplyPartner2Adapter/supplyPartner2ApiAdapter';

export default class FlightService {
  constructor(
    private flightSources: FlightSourceApiInterface[] = [
      new SupplyPartner1ApiAdapter(),
      new SupplyPartner2ApiAdapter(),
    ], // eslint-disable-next-line no-empty-function
  ) {}

  public async getFlightDetailsFromAllSources() {
    const flightData = await this.getDataFromSources();
    const uniqueFlightData = this.removeFlightDuplicateData(flightData);
    return uniqueFlightData;
  }

  private removeFlightDuplicateData(allFlightDataFromDifferentSources: Flights[]): Flights[] {
    const alreadyExistingJourneyDetails: Map<string, number> = new Map<string, number>();

    const flightDataResponse = allFlightDataFromDifferentSources.filter((flight, index: number) => {
      const uniqueKey = flight.slices
        .map(flightSlice => {
          return `${flightSlice.flightNumber}${flightSlice.departureUTC}`;
        })
        .join(' ');
      if (alreadyExistingJourneyDetails.has(uniqueKey)) {
        Logger.debug(`duplicate found ${uniqueKey}`);
        return false;
      }
      alreadyExistingJourneyDetails.set(uniqueKey, index);
      return true;
    });
    return flightDataResponse;
  }

  private async getDataFromSources(): Promise<Flights[]> {
    const dataSourcePromises = this.flightSources.map(flightDataSourceAdaper => {
      return flightDataSourceAdaper.getFlightDetails().catch((error: Error) => {
        Logger.error(error);
        return [] as Flights[];
      });
    });
    const flightDataFromSources = await Promise.all(dataSourcePromises);

    return flightDataFromSources.flat();
  }
}
