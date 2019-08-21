module.exports = {
  apps : [{
    name: 'EVERLAST',
    script: 'server.js',
    // uid: "996",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT:'5000',
      NODE_TLS_REJECT_UNAUTHORIZED:'0'
    }
  }]
};
