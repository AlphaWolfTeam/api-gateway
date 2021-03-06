/* eslint-disable no-console */
import config from './config';
import Server from './server';

const main = async () => {
  const server = new Server(config.server.port);

  await server.start();

  console.log(`Server started on port: ${config.server.port}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
