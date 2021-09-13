const { IgnorePlugin } = require('webpack');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/microservices',
    '@nestjs/websockets/socket-module',
    'cache-manager',
    'class-transformer',
    'class-validator',
    'fastify-static',
    'point-of-view',
  ];

  return {
    ...options,
    externals: ['aws-sdk'],
    plugins: [
      ...options.plugins,
      new IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
