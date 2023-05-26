const CONFIG = require("../config/config").jwt
const jwt = require("jsonwebtoken")
// const logger = require("../config/logger")

const auth = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]
  if (!token) {
    return res.status(401).send("Unauthorized")
  }
  try {
    const decoded = jwt.verify(token, CONFIG.secret)
    console.log(decoded)
    req.user = decoded.userId
    console.log(req.user)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).send("Unauthorized")
  }
}

module.exports = auth
