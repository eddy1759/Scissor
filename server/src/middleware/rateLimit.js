const rateLimiter = require("express-rate-limit")
const CONFIG = require("../config/config")

const limiter = rateLimiter({
  windowMs: CONFIG.rateLimitWindowMs,
  max: CONFIG.rateLimitMax,
  message: "Too many requests from this IP, please try again later.",
})

function rateLimiterMW(req, res, next) {
  limiter(req, res, (error) => {
    if (error) {
      console.error(`Rate limit error: ${error.message}`)
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." })
    }
    next()
  })
}

module.exports = rateLimiterMW
