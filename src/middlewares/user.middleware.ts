import { NextFunction, Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';

const extractBearerToken = (req: Request): string | null => {
  if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
/**
 * extracts the user ID from the spike token payload.
 * @param payload - Spike's token payload.
 */
const extractUserIdFromTokenPayload = (payload: any): string => payload.user.genesisId;

export default (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = extractBearerToken(req);
  if (!jwtToken) return next();
  const payload = jwtDecode(jwtToken);
  req.headers[config.userHeader] = extractUserIdFromTokenPayload(payload);
  return next();
};
