/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import * as express from 'express';
import { AxiosError } from 'axios';

export default (error: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error?.isAxiosError) {
    const err = error as AxiosError;
    const status = err.response?.status;
    const data = err.response?.data;
    if (status && (status >= 400 && status <= 500)) {
      res.status(status).send({ data });
    }
  }
  res.status(500).send({});
};
