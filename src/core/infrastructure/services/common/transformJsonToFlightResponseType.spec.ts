/* eslint-disable @typescript-eslint/naming-convention */
import transformJsonToFlightResponse from './transformJsonToFlightResponseType';
import { Flights } from '../../../../common/dto/flights';
import testSliceData from '../testHelpers/helpers';

describe('Test Json To Flight Type Transformer', () => {
  it('Should map valid json to Flight type successfully', async () => {
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
    const flightResponseData: Flights[] = await transformJsonToFlightResponse(mockJsonFlightData);
    expect(flightResponseData).toBeDefined();
    expect(flightResponseData[0].price).toEqual(mockJsonFlightData.flights[0].price);

    const journeySlices = flightResponseData[0].slices;
    const mockDepartureSlice = mockJsonFlightData.flights[0].slices[0];
    testSliceData(journeySlices[0], mockDepartureSlice);

    const mockReturnJourneySlice = mockJsonFlightData.flights[0].slices[1];
    testSliceData(journeySlices[1], mockReturnJourneySlice);
  });
});
