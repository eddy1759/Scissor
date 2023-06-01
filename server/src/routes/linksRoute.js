const express = require("express")
const { createShortUrl, getLinksByUser, createQRCode } = require("../controller/links.controller")
const auth = require("../middleware/auth")

const linkRouter = express.Router()

linkRouter.post("/short", auth, createShortUrl)
// This route is strictly for development will remove in final code after proper evaluation
linkRouter.get("/", auth, getLinksByUser)
linkRouter.get("/:shortUrl",  createQRCode)

module.exports = linkRouter