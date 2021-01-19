import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from '../config';
import serviceProxyRouter from './serviceProxyRouter';

const userProxyRouter = serviceProxyRouter(
  config.services.user.url,
  config.services.user.resourceName,
);
const groupProxyRouter = serviceProxyRouter(
  config.services.group.url,
  config.services.group.resourceName,
);

const proxyRouter: Router = Router();

proxyRouter.get('/users/:id/groups', (req, res, next) => {
  const userID = req.params.id;
  return createProxyMiddleware({
    target: config.services.group.url,
    pathRewrite: (path) => path.replace(`/api/users/${userID}/groups`, `/users/${userID}`),
  })(req, res, next);
});

proxyRouter.use('/users', userProxyRouter);
proxyRouter.use('/groups', groupProxyRouter);

export default proxyRouter;
