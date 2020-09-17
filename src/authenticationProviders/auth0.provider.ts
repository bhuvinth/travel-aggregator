/* eslint-disable class-methods-use-this */
import AppConfig from '@config/appConfig';
import AuthenticationProviderInterface from './authenticationProviderInterface';

export default class Auth0Provider implements AuthenticationProviderInterface {
  public async isTokenValid(token: string): Promise<boolean> {
    if (token === AppConfig.authToken) return true;
    return false;
  }
}
