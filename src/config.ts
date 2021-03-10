import * as env from 'env-var';

export default {
  server: {
    environment: env.get('NODE_ENV').default('development').asString(),
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
  apm: {
    isActive: env.get('ELASTIC_APM_ACTIVE').default('false').asString(),
    secretToken: env.get('ELASTIC_APM_SECRET_TOKEN').default('').asString(),
    serverUrl: env.get('ELASTIC_APM_SERVER_URL').default('http://apm:8200').asString(),
    traceParentHeader: env.get('APM_TRACEPARENT_HEADER').default('X-traceparent').asString(),
  },
  userHeader: env.get('USER_HEADER').default('X-User-ID').asString().toLowerCase(),
};
