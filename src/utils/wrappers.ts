/* eslint-disable max-len */
import { NextFunction, Request, Response } from 'express';

export default (func: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
  func(req, res, next).catch(next);
};
