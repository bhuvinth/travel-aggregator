/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from 'class-validator';
import { Flights, FlightDetails } from '@main/common/dto/flights';
import Logger from '@main/utils/logger';

async function validateFlightResponse(flightData: Flights) {
  const departureJourneyValidationResult = await validate(flightData.slices.departureJourney);
  const returnJourneyValidationResult = await validate(flightData.slices.returnJourney);
  const flightResponseValidationResult = await validate(flightData);
  if (
    departureJourneyValidationResult.length ||
    returnJourneyValidationResult.length ||
    flightResponseValidationResult.length
  ) {
    Logger.error({
      departureJourneyValidationResult,
      returnJourneyValidationResult,
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
    const [from, to] = flightJsonData.slices;

    const departureJourney = new FlightDetails();
    departureJourney.arrivalUTC = from.arrival_date_time_utc;
    departureJourney.departureUTC = from.departure_date_time_utc;
    departureJourney.destinationName = from.destination_name;
    departureJourney.durationInMinutes = from.duration;
    departureJourney.flightNumber = from.flight_number;
    departureJourney.originName = from.origin_name;

    const returnJourney = new FlightDetails();
    returnJourney.arrivalUTC = to.arrival_date_time_utc;
    returnJourney.departureUTC = to.departure_date_time_utc;
    returnJourney.destinationName = to.destination_name;
    returnJourney.durationInMinutes = to.duration;
    returnJourney.flightNumber = to.flight_number;
    returnJourney.originName = to.origin_name;

    const flightResponse = new Flights();
    flightResponse.price = flightJsonData.price;
    flightResponse.slices = {
      departureJourney,
      returnJourney,
    };

    return validateFlightResponse(flightResponse);
  });
  return Promise.all(flightData);
}
