import { Action } from "routing-controllers";
import {
  AuthenticationProviderInterface,
  Auth0Provider
} from "@main/authenticationProviders";

export default async function authenticationHelper(action: Action) {
  const authorizationHeader: string =
    action.request.headers.authorization ||
    action.request.headers.Authorization;
  if (!authorizationHeader) return false;
  const authorizationToken = authorizationHeader
    .replace("Bearer", "")
    .replace("bearer", "")
    .trim();
  const auth0Provider: AuthenticationProviderInterface = new Auth0Provider();
  return auth0Provider.isTokenValid(authorizationToken);
}
