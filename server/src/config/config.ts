import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
  port: process.env.PORT || 3000,
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
