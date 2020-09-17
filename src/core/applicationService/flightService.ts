/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Flights } from '@main/common/dto/flights';
import FlightSourceApiInterface from '../infrastructure/services/flightSourceBridges/flightSourceApiInteface';

export default class FlightService {
  // eslint-disable-next-line no-empty-function
  constructor(private flightSources: FlightSourceApiInterface[]) {}

  public async getFlightDetailsFromAllSources() {
    const flightData = await this.getDataFromSources();
    const uniqueFlightData = this.removeFlightDuplicateData(flightData);
    return uniqueFlightData;
  }

  private removeFlightDuplicateData(sourceFlightDataArray: Flights[][]): Flights[] {
    const alreadyExistingJourneyDetails: Map<string, string> = new Map<string, string>();
    const flightDataResponse: Flights[] = [];

    const notNullFlightDataArray: Flights[][] = sourceFlightDataArray.filter(
      (flightArray: Flights[]) => flightArray.length,
    );

    notNullFlightDataArray.forEach(flightData => {
      flightData.forEach(flight => {
        const uniqueKey = `${flight.slices.departureJourney.flightNumber}${flight.slices.departureJourney.departureUTC}`;
        if (alreadyExistingJourneyDetails.has(uniqueKey)) {
          return;
        }
        flightDataResponse.push(flight);
        alreadyExistingJourneyDetails.set(
          `${flight.slices.departureJourney.flightNumber}${flight.slices.departureJourney.departureUTC}`,
          `${flight.slices.departureJourney.flightNumber}${flight.slices.departureJourney.arrivalUTC}`,
        );
      });
    });

    return flightDataResponse;
  }

  private async getDataFromSources(): Promise<Flights[][]> {
    const dataSourcePromises = this.flightSources.map(flightDataSourceAdaper => {
      return flightDataSourceAdaper.getFlightDetails().catch(error => {
        console.log(error);
        return [] as Flights[];
      });
    });
    const flightDataFromSources = await Promise.all(dataSourcePromises);
    return flightDataFromSources;
  }
}
