/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import * as apm from 'elastic-apm-node';
import { NextFunction, Request, Response } from 'express';
import config from '../config';

/**
 * extract the apm traceparent from a pre-configured request header.
 * @param req - an express request.
 * @returns the traceparent from the request if exists.
 */
const extractTraceparent = (req: Request): string | undefined => {
  const traceparent = req.header(config.apm.traceParentHeader); // add as config
  return traceparent ? traceparent[0] : undefined;
};

/**
 * starts an apm transaction with a traceparent if one was given in the request.
 * @param req an express request.
 * @param functionName the wanted name for the transaction.
 * @returns the created transaction.
 */
const startApmTransaction = (req: Request, functionName: string) => {
  const traceparent = extractTraceparent(req);
  const transactionOptions = traceparent ? { childOf: traceparent } : {};
  return apm.startTransaction(functionName, transactionOptions);
};

/**
 * returns a function which updates the apm of a transaction success.
 * @param transaction the transaction which succeeded
 */
const handleRequestSuccess = (transaction: any) => () => {
  if (transaction) {
    transaction.result = 'success';
    transaction.end();
  }
};

/**
 * Wraps an asynchronous express request handler function with an error handler,
 * and an apm transaction.
 * @param func - an asynchronous request handler function.
 */
export const wrapAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const transaction = startApmTransaction(req, req.route?.path || req.baseUrl);
    func(req, res, next)
      .then(handleRequestSuccess(transaction))
      .catch(next);
  };
};
/**
 * Wraps a proxy requestHandler function with apm transaction creation.
 * @param func - a proxy request handler function.
 */
export const transWrap = (func: (req: Request, res: Response, next: NextFunction) => any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    startApmTransaction(req, req.route?.path || req.baseUrl);
    func(req, res, next);
  };
};

/**
 * Add apm traceparent to a given headers object if there is a current traceparent.
 * @param headers - an headers object
 */
export const addTraceparentToHeaders = (headers = {}) => {
  const traceparent = apm.currentTraceparent;
  if (traceparent) {
    return { ...headers, [config.apm.traceParentHeader]: traceparent };
  }
  return headers;
};
