import * as env from 'env-var';

export default {
  server: {
    port: env.get('PORT').default('8000').asPortNumber().toString(),
  },
  services: {
    user: {
      url: env.get('USER_SERVICE_URL').required().asUrlString(),
      resourceName: 'users',
    },
    group: {
      url: env.get('GROUP_SERVICE_URL').required().asUrlString(),
      resourceName: 'groups',
    },
    userServiceUrl: env.get('USER_SERVICE_URL').required().asUrlString(),
    groupServiceUrl: env.get('GROUP_SERVICE_URL').required().asUrlString(),
  },
  userHeader: env.get('USER_HEADER').default('X-User-ID').asString().toLowerCase(),
};
