/* eslint-disable class-methods-use-this */
import { Flights } from '@main/common/dto/flights';
import AppConfig from '@main/config/appConfig';
import callAPIWithTimeout from '@infrastructure/services/common/callApiWithTimeout';
import transformJsonToFlightResponse from '@infrastructure/services/common/transformJsonToFlightResponseType';
import FlightSourceApiInterface from '../flightSourceApiInteface';

export default class SupplyPartner2ApiAdapter implements FlightSourceApiInterface {
  public async getFlightDetails(): Promise<Flights[]> {
    const authHeaderValue = this.getAuthHeaderValue();
    const authHeader = {
      authorization: authHeaderValue,
    };
    return callAPIWithTimeout(
      AppConfig.source2APIConfiguration.url,
      authHeader,
      AppConfig.source2APIConfiguration.timeout,
    )
      .then(response => this.processResponse(response))
      .catch((error: Error) => {
        // I have added this catch here for verbosity in the Error messages, which are easy to search and track.
        throw new Error(`${error.message} in SupplyPartner2ApiAdapter`);
      });
  }

  private getAuthHeaderValue() {
    return `Basic ${Buffer.from(
      `${AppConfig.source2APIConfiguration.username}:${AppConfig.source2APIConfiguration.password}`,
    ).toString('base64')}`;
  }

  private async processResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Invalid response: ${response.status} ${await response.text()}`);
    }
    const responseJson = await response.json();
    return transformJsonToFlightResponse(responseJson);
  }
}
