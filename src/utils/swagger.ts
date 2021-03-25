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
            in: 'header',
            name: 'X-User-ID',
            type: 'string',
            format: 'uuid',
            description: '`requesterID` - the user ID of the requester. Required sometimes.',
            required: true,
          },
          {
            in: 'query',
            name: 'partial',
            type: 'string',
            description: 'A partial string to search by.',
            required: true,
          },
          {
            in: 'query',
            name: 'type',
            type: 'string',
            description: 'The type of the group. (`public` by default).',
            required: false,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Response',
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
      post: {
        tags: [
          'Groups',
        ],
        summary: 'Create Group',
        parameters: [
          {
            in: 'header',
            name: 'X-User-ID',
            type: 'string',
            format: 'uuid',
            description: '`requesterID` - the user ID of the requester.',
            required: true,
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              $ref: '#/definitions/Group',
            },
            description: '',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Response',
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
          $ref: '#/definitions/Group-Type',
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
                $ref: '#/definitions/User-Role',
              },
            },
          },
        },
      },
    },
    'Group-Type': {
      type: 'string',
      enum: [
        'private',
        'public',
      ],
    },
    'User-Role': {
      type: 'string',
      enum: [
        'Member',
        'Modifier',
        'Admin',
      ],
    },
    Response: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          format: 'ObjectId',
        },
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
          $ref: '#/definitions/Group-Type',
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
                $ref: '#/definitions/User-Role',
              },
            },
          },
        },
        modifiedBy: {
          type: 'string',
          format: 'ObjectId',
        },
        createdBy: {
          type: 'string',
          format: 'ObjectId',
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
