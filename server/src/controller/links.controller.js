const Links = require("../model/link")
const helper = require("../utils/helper")
const CONFIG = require("../config/config")
const validUrl = require("valid-url")


const createShortUrl = async(req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send("Invalid request")
        }
        const {url, customDomain} =  req.body
        const userId = req.user.userId

        if (!validUrl.isWebUri(url)) {
            return res.status(400).json({error: "Invalid URL"})
        }
       
        const shortCode = helper.generateShortUrl()
        // const shortURL = `${CONFIG.BASE_URL}\${shortCode}`
        const dataLinks =  new Links({
            url,
            shortUrl: shortCode,
            customDomain,
            createdBy: userId
        })
        await dataLinks.save()
        // Return the shortened URL to the user
        // Return the shortened URL to the user
        const shortenedURLString = customDomain ? `${customDomain}/${shortCode}` : `${CONFIG.BASE_URL}\${shortCode}`

        res.status(200).json({
            status: true,
            url: shortenedURLString
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}


module.exports = createShortUrl


