/* eslint-disable*/
jest.mock('node-fetch');
import fetch from 'node-fetch';
import { FlightDetails, Flights } from '../../../../../common/dto/flights';
import SupplyPartner1ApiAdapter from './supplyPartner1ApiAdapter';

const { Response } = jest.requireActual('node-fetch');

describe('Test Source1ApiAdapter with mocked node-fetch', () => {
  
  function testSliceData(
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
    expect(flightResponseDepartureSlice.arrivalUTC).toEqual(
      mockDepartureSlice.arrival_date_time_utc,
    );
    expect(flightResponseDepartureSlice.departureUTC).toEqual(
      mockDepartureSlice.departure_date_time_utc,
    );
    expect(flightResponseDepartureSlice.destinationName).toEqual(
      mockDepartureSlice.destination_name,
    );
    expect(flightResponseDepartureSlice.durationInMinutes).toEqual(mockDepartureSlice.duration);
    expect(flightResponseDepartureSlice.flightNumber).toEqual(mockDepartureSlice.flight_number);
    expect(flightResponseDepartureSlice.originName).toEqual(mockDepartureSlice.origin_name);
  }
  
  it('Should work with fetch', async () => {
    const mockJsonFlightData = {
      flights: [
        {
          slices: [
            {
              origin_name: 'Schonefeld',
              destination_name: 'Stansted',
              departure_date_time_utc: '2019-08-08T04:30:00.000Z',
              arrival_date_time_utc: '2019-08-08T06:25:00.000Z',
              flight_number: '144',
              duration: 115,
            },
            {
              origin_name: 'Stansted',
              destination_name: 'Schonefeld',
              departure_date_time_utc: '2019-08-10T06:50:00.000Z',
              arrival_date_time_utc: '2019-08-10T08:40:00.000Z',
              flight_number: '145',
              duration: 110,
            },
          ],
          price: 129,
        },
      ],
    };
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockJsonFlightData))));
    const source1ApiAdapterObj = new SupplyPartner1ApiAdapter();
    const flightResponseData: Flights[] = await source1ApiAdapterObj.getFlightDetails();
    expect(flightResponseData).toBeDefined();
    expect(flightResponseData[0].price).toEqual(mockJsonFlightData.flights[0].price);

    const { departureJourney, returnJourney } = flightResponseData[0].slices;
    const mockDepartureSlice = mockJsonFlightData.flights[0].slices[0];
    testSliceData(departureJourney, mockDepartureSlice);

    const mockReturnJourneySlice = mockJsonFlightData.flights[0].slices[1];
    testSliceData(returnJourney, mockReturnJourneySlice);
  });

  it('Should throw error for error response', async () => {
    const errorMessage = 'fake error message';
    // @ts-ignore
    fetch.mockRejectedValue(new Error(errorMessage));
    const source1ApiAdapterObj = new SupplyPartner1ApiAdapter();
    const flightResponseDataPromise = source1ApiAdapterObj.getFlightDetails();
    expect(flightResponseDataPromise).rejects.toThrow(errorMessage);
  });

  it('Should return a new Error message for invalid response', async () => {
    const mockResponseText = 'MOCKERROR'
    const mockResponse = new Response(mockResponseText,{status: 401});
     // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(mockResponse));
    const source1ApiAdapterObj = new SupplyPartner1ApiAdapter();
    const flightResponseDataPromise = source1ApiAdapterObj.getFlightDetails();
    expect(flightResponseDataPromise).rejects.toThrow('Invalid response: 401 MOCKERROR');

  })
});
