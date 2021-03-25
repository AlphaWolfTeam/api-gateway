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
      name: 'User Header',
      description: 'Most of the API endpoints require a `requesterID` - the user ID of the requester. The ID should be sent in a header (usually `X-User-ID`). Endpoints that do not always require a requester may return a Forbidden error in some cases where `requesterID` is necessary. Therefore sending a `requesterID` is always advised.',
    },
    {
      name: 'Roles and Permissions',
      description: "The endpoints that require a `requesterID` validate that the user has permission for the action he requested. The service finds the requester role in the group and then compares it with the required role for that action by the `requiredRole` found in this file. The requester must be in a group in order to make CRUD requests on it unless it's a GET on a public group.",
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
            description: "`requesterID` - the user ID of the requester. \nRequired sometimes.\nThe requester must be in a group in order to make request on it unless it's a public group.",
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
                $ref: '#/definitions/Group-Primal',
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
              $ref: '#/definitions/Create-Group',
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
                $ref: '#/definitions/Group-Primal',
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
    '/groups/{id}': {
      get: {
        tags: [
          'Groups',
        ],
        parameters: [
          {
            in: 'header',
            name: 'X-User-ID',
            type: 'string',
            format: 'uuid',
            description: "`requesterID` - the user ID of the requester. \nRequired sometimes.\nThe requester must be in a group in order to make request on it unless it's a public group.",
            required: true,
          },
          {
            in: 'path',
            name: 'id',
            type: 'string',
            description: 'The id of the group',
            required: true,
          },
        ],
        summary: 'Get group by ID',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Group-Primal',
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
      patch: {
        tags: [
          'Groups',
        ],
        summary: 'Update Group',
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
            in: 'path',
            name: 'id',
            type: 'string',
            description: 'The id of the group',
            required: true,
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              $ref: '#/definitions/Update-Group',
            },
            description: '',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Group-Primal',
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
      delete: {
        tags: [
          'Groups',
        ],
        summary: 'Delete group',
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
            in: 'path',
            name: 'id',
            type: 'string',
            description: 'The id of the group',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  format: 'ObjectId',
                },
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
    'Create-Group': {
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
    'Update-Group': {
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
    'Group-Primal': {
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
