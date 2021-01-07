import { Response } from 'express';
import { AxiosResponse } from 'axios';

/**
 * returns weather an http status is in the range of 2XX
 * @param status an http status code (number)
 */
const isSuccessStatus = (status: number): boolean => Math.floor(status / 100) === 2;

export default (res: Response, proxyRes: AxiosResponse<any>): void => {
  const { status } = proxyRes;
  // Validate that it is a success
  if (!isSuccessStatus(status)) {
    return;
  }
  res.status(status).json(proxyRes.data);
};
