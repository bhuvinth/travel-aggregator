import fetch from 'node-fetch';
import AbortController from 'abort-controller';

export default async function callAPIWithTimeout(
  url: string,
  headers: { [key: string]: string },
  timeoutInMilliSeconds: number,
): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutInMilliSeconds);

  return fetch(url, {
    signal: controller.signal,
    headers,
  }).finally(() => {
    clearTimeout(timeout);
  });
}
