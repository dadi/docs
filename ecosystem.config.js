module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    {
      name: 'DADI DOCS',
      script: 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_staging: {
        PORT: 8000,
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
