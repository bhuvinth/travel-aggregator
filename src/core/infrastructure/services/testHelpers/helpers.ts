/* eslint-disable @typescript-eslint/naming-convention */
import { FlightDetails } from '@main/common/dto/flights';

export default function testSliceData(
  flightResponseDepartureSlice: FlightDetails,
  mockDepartureSlice: {
    origin_name: string;
    destination_name: string;
    departure_date_time_utc: string;
    arrival_date_time_utc: string;
    flight_number: string;
    duration: number;
  },
) {
  expect(flightResponseDepartureSlice).toBeDefined();
  expect(mockDepartureSlice).toBeDefined();
  expect(flightResponseDepartureSlice.arrivalUTC).toEqual(mockDepartureSlice.arrival_date_time_utc);
  expect(flightResponseDepartureSlice.departureUTC).toEqual(
    mockDepartureSlice.departure_date_time_utc,
  );
  expect(flightResponseDepartureSlice.destinationName).toEqual(mockDepartureSlice.destination_name);
  expect(flightResponseDepartureSlice.durationInMinutes).toEqual(mockDepartureSlice.duration);
  expect(flightResponseDepartureSlice.flightNumber).toEqual(mockDepartureSlice.flight_number);
  expect(flightResponseDepartureSlice.originName).toEqual(mockDepartureSlice.origin_name);
}
