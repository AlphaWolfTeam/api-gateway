import * as apm from 'elastic-apm-node';
import * as bodyParser from 'body-parser';
import { once } from 'events';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as logger from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import userMiddleware from './middlewares/user.middleware';
import proxyRouter from './routers/proxyRouter';
import router from './routers/router';
import errorMiddleware from './utils/error.middleware';
import config from './config';

export default class Server {
  app: express.Application;

  private http: http.Server | undefined;

  private port: string;

  private env: string;

  constructor(port: string, env:string = 'prod') {
    this.port = port;
    this.env = env;
    this.app = express();

    this.configureAPM();
    this.configureMiddleware();
    this.configureSwagger();
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

  // eslint-disable-next-line class-methods-use-this
  private configureAPM() {
    apm.start({
      serviceName: 'api-gateway',
      secretToken: config.apm.secretToken,
      serverUrl: config.apm.serverUrl,
      active: config.apm.isActive === 'true',
      environment: config.server.environment,
    });
  }

  private configureSwagger() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
