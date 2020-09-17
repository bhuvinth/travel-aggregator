import { IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';

export class Flights {
  @ValidateNested()
  slices: {
    departureJourney: FlightDetails;
    returnJourney: FlightDetails;
  };

  @IsNumber({ allowNaN: false }, { message: 'Invalid Price' })
  price: number;
}

export class FlightDetails {
  @IsString({ message: 'Invalid Origin name' })
  originName: string;

  @IsString({ message: 'Invalid Destination name' })
  destinationName: string;

  @IsDateString({ message: 'Invalid departure date' })
  departureUTC: Date;

  @IsDateString({ message: 'Invalid arrival date' })
  arrivalUTC: Date;

  @IsString({ message: 'Invalid Flight number' })
  flightNumber: string;

  @IsNumber({ allowNaN: false }, { message: 'Invalid duration' })
  durationInMinutes: number;
}
