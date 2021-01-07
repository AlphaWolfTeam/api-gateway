import { Request, RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const restream = (proxyReq: any, req: Request) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

export default (url: string, featureRouteName: string): RequestHandler => createProxyMiddleware({
  target: url,
  onProxyReq: restream,
  pathRewrite: (path) => path.replace(`/api/${featureRouteName}`, ''),
});
