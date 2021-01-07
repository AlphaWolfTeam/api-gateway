/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { Response, Request, NextFunction } from 'express';

export default (func: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
  func(req, res, next).catch(next);
};
