/* eslint-disable no-undef */
const path = require("path")
require("dotenv").config({path: path.resolve(__dirname, "../../.env")})


const CONFIG = {
  PORT: process.env.PORT,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: process.env.RATE_LIMIT_MAX,
  url: process.env.MONGODB_URL,
  BASE_URL: process.env.BASE,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRE_IN,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.REDIS_TTL,
  },
}

module.exports = CONFIG
