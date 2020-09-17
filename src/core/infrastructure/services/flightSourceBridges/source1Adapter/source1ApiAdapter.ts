/* eslint-disable class-methods-use-this */
import { Flights } from '@main/common/dto/flights';
import AppConfig from '@main/config/appConfig';
import { Response } from 'node-fetch';
import callAPIWithTimeout from '../../common/callApiWithTimeout';
import transformJsonToFlightResponse from '../../common/transformJsonToFlightResponseType';
import FlightSourceApiInterface from '../flightSourceApiInteface';

export default class Source1ApiAdapter implements FlightSourceApiInterface {
  public getFlightDetails(): Promise<Flights[]> {
    const authHeaderValue = `Basic ${Buffer.from(
      `${AppConfig.source1APIConfiguration.username}:${AppConfig.source1APIConfiguration.password}`,
    ).toString('base64')}`;

    const authHeader = {
      authorization: authHeaderValue,
    };
    return callAPIWithTimeout(
      AppConfig.source1APIConfiguration.url,
      authHeader,
      AppConfig.source1APIConfiguration.timeout,
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
