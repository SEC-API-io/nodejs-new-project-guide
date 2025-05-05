const MAX_RESTARTS = 10;

module.exports = {
  apps: [
    {
      name: 'my-app',
      script: './index.js',
      max_restarts: MAX_RESTARTS,
      max_memory_restart: '1G',
      instances: 1, // define number of workers
      // use `fork` so that console.log is forwarded to main process
      // when forking a child inside a worker
      exec_mode: 'fork', // `fork` or `cluster`.
      cron_restart: '0 4 * * *', // restart at 4am UTC
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
