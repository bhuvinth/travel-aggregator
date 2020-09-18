/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from 'class-validator';
import { Flights, FlightDetails } from '@main/common/dto/flights';
import Logger from '@main/utils/logger';

async function validateFlightResponse(flightData: Flights) {
  const validationResultPromises = flightData.slices.map(async (flight: FlightDetails) => {
    return validate(flight);
  });
  const validationResults = (await Promise.all(validationResultPromises)).flat();
  const flightResponseValidationResult = await validate(flightData);
  if (validationResults.length || flightResponseValidationResult.length) {
    Logger.error({
      validationResults,
      flightResponseValidationResult,
    });
    return null;
  }

  return flightData;
}

export default async function transformJsonToFlightResponse(
  flightsJsonData: any,
): Promise<Flights[]> {
  const flightData: Flights[] = flightsJsonData.flights.map(async (flightJsonData: any) => {
    const flightSlices: FlightDetails[] = flightJsonData.slices.map(
      (journeySlice: any): FlightDetails => {
        const journey = new FlightDetails();
        journey.arrivalUTC = journeySlice.arrival_date_time_utc;
        journey.departureUTC = journeySlice.departure_date_time_utc;
        journey.destinationName = journeySlice.destination_name;
        journey.durationInMinutes = journeySlice.duration;
        journey.flightNumber = journeySlice.flight_number;
        journey.originName = journeySlice.origin_name;
        return journey;
      },
    );

    const flightResponse = new Flights();
    flightResponse.price = flightJsonData.price;
    flightResponse.slices = flightSlices;

    return validateFlightResponse(flightResponse);
  });
  return Promise.all(flightData);
}
