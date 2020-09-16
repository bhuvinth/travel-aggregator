export type FlightResponse = {
  slices: FlightDetails[];
  price: number;
};

export type FlightDetails = { 
  originName: string;
  destinationName: string;
  departureUTC: Date;
  arrivalUTC: Date;
  flightNumber: number;
  duration: number;
}