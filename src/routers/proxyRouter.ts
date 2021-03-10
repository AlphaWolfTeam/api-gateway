import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from '../config';
import { transWrap, addTraceparentToHeaders } from '../utils/apm';
import serviceProxyRouter, { onError, onProxyRes } from './serviceProxyRouter';

const userProxyRouter = (headers: any) => serviceProxyRouter(
  config.services.user.url,
  config.services.user.resourceName,
  headers,
);

const groupProxyRouter = (headers: any) => serviceProxyRouter(
  config.services.group.url,
  config.services.group.resourceName,
  headers,
);

const proxyRouter: Router = Router();
/**
 * Get Groups of a User.
 * This function requires a special handling because of the requirement of a URL change:
 * Although the URI starts with 'users' it calls the group service.
 */
proxyRouter.get('/users/:id/groups', transWrap(async (req, res, next) => {
  const userID = req.params.id;
  return createProxyMiddleware({
    target: config.services.group.url,
    pathRewrite: (path) => path.replace(`/api/users/${userID}/groups`, `/users/${userID}`),
    onError,
    onProxyRes,
    headers: addTraceparentToHeaders(),
  })(req, res, next);
}));

proxyRouter.use('/users', transWrap(async (req, res, next) => {
  userProxyRouter(addTraceparentToHeaders())(req, res, next);
}));

proxyRouter.use('/groups', transWrap(async (req, res, next) => {
  groupProxyRouter(addTraceparentToHeaders())(req, res, next);
}));

export default proxyRouter;
