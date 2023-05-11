const path = require('path');
require('dotenv').config({
  path: path.resolve('/workspaces/Scissor/server', '.env'),
});

const CONFIG = {
  port: process.env.PORT || 3000,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: process.env.RATE_LIMIT_MAX,
  db: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRE_IN,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.REDIS_TTL,
  },
};

module.exports = CONFIG;
