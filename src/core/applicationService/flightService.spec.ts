import FlightSourceApiAdapter, {
  flights,
  flights as flightsMockData,
} from './mocks/flightSourceApiAdapter.mock';
import FlightSourceApiFailAdapter from './mocks/flightSourceApiAdapter.fail.mock';
import FlightService from './flightService';

describe('Test Flight Service for unique flight data being returned', () => {
  it('Should return unique data > when both data source returns same data.', async () => {
    const flightSource1Adapter = new FlightSourceApiAdapter(flights);
    const flightSource1AdapterSpy = jest.spyOn(flightSource1Adapter, 'getFlightDetails');
    const flightServiceObj = new FlightService([flightSource1Adapter, flightSource1Adapter]);
    const flightResponse = await flightServiceObj.getFlightDetailsFromAllSources();
    expect(flightSource1AdapterSpy).toHaveBeenCalledTimes(2);
    expect(flightResponse).toEqual(flightsMockData);
  });

  it('Should return unique data > when both data source returns data with duplicates.', async () => {
    const mockFlights = [...flightsMockData];
    mockFlights.push(mockFlights[0]);

    const flightSource1Adapter = new FlightSourceApiAdapter(mockFlights);
    const flightSource1AdapterSpy = jest.spyOn(flightSource1Adapter, 'getFlightDetails');
    const flightServiceObj = new FlightService([flightSource1Adapter, flightSource1Adapter]);
    const flightResponse = await flightServiceObj.getFlightDetailsFromAllSources();
    expect(flightSource1AdapterSpy).toHaveBeenCalledTimes(2);
    expect(flightResponse).toEqual(flightsMockData);
  });

  it('Should return data > when one source returns an error and other source returns data', async () => {
    const flightSource1Adapter = new FlightSourceApiAdapter(flightsMockData);
    const flightSource2Adapter = new FlightSourceApiFailAdapter();
    const flightSource1AdapterSpy = jest.spyOn(flightSource1Adapter, 'getFlightDetails');
    const flightSource2AdapterSpy = jest.spyOn(flightSource2Adapter, 'getFlightDetails');
    const flightServiceObj = new FlightService([flightSource1Adapter, flightSource2Adapter]);
    const flightResponse = await flightServiceObj.getFlightDetailsFromAllSources();

    expect(flightSource1AdapterSpy).toHaveBeenCalledTimes(1);
    expect(flightSource2AdapterSpy).toHaveBeenCalledTimes(1);

    expect(flightResponse).toEqual(flightsMockData);
  });
});
