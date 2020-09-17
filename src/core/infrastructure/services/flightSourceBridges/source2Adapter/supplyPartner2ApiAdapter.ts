/* eslint-disable class-methods-use-this */
import { Flights } from '@main/common/dto/flights';
import AppConfig from '@main/config/appConfig';
import callAPIWithTimeout from '../../common/callApiWithTimeout';
import transformJsonToFlightResponse from '../../common/transformJsonToFlightResponseType';
import FlightSourceApiInterface from '../flightSourceApiInteface';

export default class SupplyPartner2ApiAdapter implements FlightSourceApiInterface {
  public async getFlightDetails(): Promise<Flights[]> {
    const authHeaderValue = `Basic ${Buffer.from(
      `${AppConfig.source2APIConfiguration.username}:${AppConfig.source2APIConfiguration.password}`,
    ).toString('base64')}`;

    const authHeader = {
      authorization: authHeaderValue,
    };
    return callAPIWithTimeout(
      AppConfig.source2APIConfiguration.url,
      authHeader,
      AppConfig.source2APIConfiguration.timeout,
    ).then(response => this.processResponse(response));
  }

  private async processResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Invalid response: ${response.status} ${await response.text()}`);
    }
    const responseJson = await response.json();
    return transformJsonToFlightResponse(responseJson);
  }
}
