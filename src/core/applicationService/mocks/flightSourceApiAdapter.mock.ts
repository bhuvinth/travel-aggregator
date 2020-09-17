/* eslint-disable class-methods-use-this */
import { Flights } from '@main/common/dto/flights';
import FlightSourceApiInterface from '@main/core/infrastructure/services/flightSourceBridges/flightSourceApiInteface';

export const flights: Flights[] = [
  {
    price: 100,
    slices: {
      departureJourney: {
        arrivalUTC: new Date('2020-01-01T22:00:00'),
        departureUTC: new Date('2020-01-01T20:00:00'),
        destinationName: 'Cagliari',
        durationInMinutes: 120,
        flightNumber: '255',
        originName: 'Berlin',
      },
      returnJourney: {
        arrivalUTC: new Date('2020-01-01T18:00:00'),
        departureUTC: new Date('2020-01-01T16:00:00'),
        destinationName: 'Berlin',
        durationInMinutes: 120,
        flightNumber: '255',
        originName: 'Cagliari',
      },
    },
  },
  {
    price: 200,
    slices: {
      departureJourney: {
        arrivalUTC: new Date('2020-01-01T22:00:00'),
        departureUTC: new Date('2020-01-01T19:00:00'),
        destinationName: 'Rejkyavik',
        durationInMinutes: 180,
        flightNumber: '255',
        originName: 'Berlin',
      },
      returnJourney: {
        arrivalUTC: new Date('2020-01-01T19:00:00'),
        departureUTC: new Date('2020-01-01T16:00:00'),
        destinationName: 'Berlin',
        durationInMinutes: 180,
        flightNumber: '255',
        originName: 'Rejkyavik',
      },
    },
  },
];
export default class FlightSourceApiAdapter implements FlightSourceApiInterface {
  // eslint-disable-next-line
  constructor(private flightData: Flights[]) {}

  public async getFlightDetails(): Promise<Flights[]> {
    return this.flightData;
  }
}
