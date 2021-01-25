/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import * as apm from 'elastic-apm-node';
import { Request, RequestHandler, Response } from 'express';
import * as http from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { addTraceparentToHeaders } from '../utils/apm';

export const restream = (proxyReq: any, req: Request) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

const isHttpSuccessStatusCode = (statusCode: number | undefined): boolean => {
  if (!statusCode) return false;
  return Math.floor(statusCode / 100) === 2;
};

/**
 * a middleware that end an apm transaction in case of an error from the proxy.
 */
export const onError = (err: Error, req: Request, res: Response): void => {
  const transaction = apm.currentTransaction;
  apm.captureError(err);
  if (transaction) {
    transaction.result = 'error';
    transaction.end();
  }
};

/**
 * a middleware that end an apm transaction in success in case of a result.
 */
export const onProxyRes = (proxyRes: http.IncomingMessage, req: Request, res: Response): void => {
  const transaction = apm.currentTransaction;
  if (transaction) {
    if (isHttpSuccessStatusCode(proxyRes.statusCode)) {
      transaction.result = 'success';
    }
    transaction.end();
  }
};

/**
 * create a proxy middleware with configured options for a specific service.
 * @param url - the url of the service.
 * @param featureRouteName  - the name of the feature - will be displayed in the URI.
 * @param headers - pre configured headers to add to the proxy request.
 * @returns a requestHandler that proxy the request to the given service (by its url).
 */
export default (url: string, featureRouteName: string, headers = {}): RequestHandler => {
  return createProxyMiddleware({
    target: url,
    onProxyReq: restream,
    onError,
    onProxyRes,
    headers: addTraceparentToHeaders(),
    pathRewrite: (path) => path.replace(`/api/${featureRouteName}`, ''),
  });
};
