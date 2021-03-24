const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Friends API',
    description: 'An API Gateway for **Friends**. \nAll requests require a Spike Oauth token using `code` grant-type. \nThe is enforced by using `Spike Proxy Service (Incoming)`.',
  },
  tags: [
    {
      name: 'Pet',
      description: 'API for users in the system',
    },
  ],
  paths: {
  },
  consumes: ['application/json'],
  produces: ['application/json'],
};

export default swaggerDocument;
