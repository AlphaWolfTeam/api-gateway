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
            name: 'scope',
            type: 'string',
            description: 'read',
            required: true,
          },
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
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            name: 'scope',
            type: 'string',
            description: 'read',
            required: true,
          },
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
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            description: ' OK',
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
    '/groups/{id}/tags/{label}': {
      put: {
        tags: [
          'Groups',
        ],
        summary: 'Add tag to group',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            in: 'path',
            name: 'label',
            type: 'string',
            description: 'The label to add',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
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
        summary: 'Remove tag from group',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            in: 'path',
            name: 'label',
            type: 'string',
            description: 'The label to remove',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
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
    '/groups/{id}/users': {
      post: {
        tags: [
          'Groups',
        ],
        summary: 'Add user to group',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            description: 'Role is optional',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'ObjectId',
                },
                role: {
                  $ref: '#/definitions/User-Role',
                },
              },
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
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
    '/groups/{groupId}/users/{userId}': {
      patch: {
        tags: [
          'Groups',
        ],
        summary: 'Update user role in group',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            name: 'groupId',
            type: 'string',
            description: 'The id of the group',
            required: true,
          },
          {
            in: 'path',
            name: 'userId',
            type: 'string',
            description: 'The id of the user to update',
            required: true,
          },
          {
            in: 'body',
            name: 'body',
            schema: {
              type: 'object',
              properties: {
                role: {
                  $ref: '#/definitions/User-Role',
                },
              },
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'OK',
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
        summary: 'Remove user from group',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'write',
            required: true,
          },
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
            name: 'groupId',
            type: 'string',
            description: 'The id of the group',
            required: true,
          },
          {
            in: 'path',
            name: 'userId',
            type: 'string',
            description: 'The id of the user to update',
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
    '/users/{id}/groups': {
      get: {
        tags: [
          'Groups',
        ],
        summary: 'Get groups of user',
        parameters: [
          {
            in: 'header',
            name: 'scope',
            type: 'string',
            description: 'read',
            required: true,
          },
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
            description: 'The id of the user',
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
      description: 'Member- 0, Modifier- 1, Admin- 2',
      type: 'number',
      enum: [
        0,
        1,
        2,
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
