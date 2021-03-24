const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Friends API',
    description: 'An API Gateway for **Friends**. \nAll requests require a Spike Oauth token using `code` grant-type. \nThe is enforced by using `Spike Proxy Service (Incoming)`.',
  },
  tags: [
    {
      name: 'Groups',
    },
    {
      name: 'Roles and Permissions',
    },
  ],
  paths: {
    '/groups': {
      get: {
        tags: [
          'Groups',
        ],
        summary: 'Search Group',
        parameters: [
          {
            in: 'query',
            name: 'partial',
            type: 'string',
            description: 'A partial string to search by',
            required: true,
          },
          {
            in: 'query',
            name: 'type',
            type: 'string',
            description: 'The type of the group. (`public` by default)',
            required: false,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Group',
              },
            },
          },
          400: {
            description: 'Validation error',
          },
          401: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Server side error',
          },
        },
      },
    },
  },
  definitions: {
    Group: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        icon: {
          type: 'string',
          format: 'base64',
        },
        type: {
          type: 'string',
          enum: [
            'private',
            'public',
          ],
        },
        tags: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
              },
            },
          },
        },
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              role: {
                type: 'string',
                enum: [
                  'Member',
                  'Modifier',
                  'Admin',
                ],
              },
            },
          },
        },
        modifiedBy: {
          type: 'string',
        },
        createdBy: {
          type: 'string',
        },
        exchangeAddress: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
  },
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
};

export default swaggerDocument;
