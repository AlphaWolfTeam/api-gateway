import { AxiosError } from 'axios';
import * as apm from 'elastic-apm-node';
import * as express from 'express';

/**
 * Express Error Handler.
 * The handler catch the error thrown by a request and send it to the user.
 * If the error is an axios error, details of the error will be sent to the client.
 * Also, if there is an open transaction it will be closed as an error.
 */
export default (error: any, _req: express.Request,
  res: express.Response, next: express.NextFunction) => {
  const transaction = apm.currentTransaction;

  if (error?.isAxiosError) {
    const err = error as AxiosError;
    const status = err.response?.status;
    const data = err.response?.data;

    // send error to apm
    apm.captureError(err);
    if (transaction) {
      transaction.result = 'error';
      transaction.end();
    }

    if (status && (status >= 400 && status <= 500)) {
      res.status(status).send({ data });
      return;
    }
  } else {
    // send error to apm
    apm.captureError(error);
    if (transaction) {
      transaction.result = 'error';
      transaction.end();
    }
  }
  res.status(500).send({});
};
