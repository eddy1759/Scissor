const Links = require("../model/link")
const helper = require("../utils/helper")
const CONFIG = require("../config/config")
const validUrl = require("valid-url")


const ShortenURL = async(req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send("Invalid request")
        }
        const {url, customDomain} =  req.body
        const userId = req.user.userId

        if (!validUrl.isWebUri(url)) {
            return res.status(400).json({error: "Invalid URL"})
        }

        if (customDomain) {
            const existingUrl = await Links.findOne({customDomain})
            if (existingUrl) {
                res.status(400).json({message: "Custom domain already in use"})
            }
        }
        const uniqueId = helper.generateShortUrl()
        const shortURL = `${CONFIG.BASE_URL}\${uniqueId}`
        const link = await Links.create({
            url,
            shortUrl: shortURL,
            createdBy: userId
        })
        
    } catch (error) {
        
    }
}


