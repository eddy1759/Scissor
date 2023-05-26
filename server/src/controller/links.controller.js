const Links = require("../model/link")
const helper = require("../utils/helper")
const validUrl = require("valid-url")


const createShortUrl = async(req, res) => {
    // console.log(req)
    try {
        if (!req.body) {
            return res.status(400).send("Invalid request")
        }
        const {url, customUrl} =  req.body
        const userId = req.user

        if (!validUrl.isWebUri(url)) {
            return res.status(400).json({error: "Invalid URL"})
        }
       
        const shortCode = helper.generateShortString()
        console.log(shortCode)

        const protocol = req.protocol
        const host = req.get("host")
        const BASE_URL = helper.encodeBaseURL(protocol, host)

        const dataLinks =  new Links({
            url,
            shortUrl: shortCode,
            customUrl,
            createdBy: userId
        })
        await dataLinks.save()
        
        const shortenedURLString = customUrl ? `${BASE_URL}/${customUrl}` : `${BASE_URL}/${shortCode}`

        res.status(200).json({
            status: true,
            url: shortenedURLString
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

// This controller is strictly for development will remove in final code after proper evaluation
const getLinksByUser = async(req, res) => {
    try {
        const createdBy = req.user
        if (!createdBy) {
            return res.status(400).send("Users not authenticated")
        }
        const links = await Links.find({}).populate({path: "createdBy", select: "-email -password -createdAt -updatedAt -__v"}).select(" -__v")
        res.status(200).json({
            status: true,
            links 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the links."
        })
    }
}



module.exports = {
    createShortUrl,
    getLinksByUser
}


