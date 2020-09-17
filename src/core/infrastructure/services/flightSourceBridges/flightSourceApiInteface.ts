import { Flights } from '@main/common/dto/flights';

export default interface FlightSourceApiInterface {
  getFlightDetails(): Promise<Flights[]>;
}
