import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as logger from 'morgan';

import { once } from 'events';
import errorMiddleware from './utils/error.middleware';
// import GroupRouter from './group/group.router';

import router from './routers/router';
import proxyRouter from './routers/proxyRouter';
import userMiddleware from './middlewares/user.middleware';

export default class Server {
  app: express.Application;

  private http: http.Server | undefined;

  private port: string;

  private env: string;

  constructor(port: string, env:string = 'prod') {
    this.port = port;
    this.env = env;
    this.app = express();

    this.configureMiddleware();
    this.configureApiRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddleware() {
    if (this.env !== 'test') {
      this.app.use(logger('tiny'));
    }
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(userMiddleware);
  }

  private configureApiRoutes() {
    // Is Alive
    this.app.get('/isAlive', (req, res) => {
      res.status(200).send('alive');
    });
    this.app.use('/api', router);
    this.app.use('/api', proxyRouter);
  }

  // configureErrorHandlers
  private configureErrorHandlers() {
    this.app.use(errorMiddleware);
  }

  public async start() {
    this.http = this.app.listen(this.port);
    await once(this.http, 'listening');
  }
}
