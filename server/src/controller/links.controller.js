const Links = require("../model/link")
const helper = require("../utils/helper")
const validUrl = require("valid-url")
const qr = require("qrcode")


const createShortUrl = async(req, res) => {
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

        const protocol = req.protocol
        const host = req.get("host")
        const BASE_URL = helper.encodeBaseURL(protocol, host)

        const dataLinks =  new Links({
            url,
            shortUrl: customUrl || shortCode,
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
        console.error(error)
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the links."
        })
    }
}


const createQRCode = async (req, res) => {
    const shortUrl= req.params.shortUrl
    try {
        const data = await Links.findOne({shortUrl})
        if (!data) {
            return res.status(404).json({
               error:  "URL Not Found"
            })
        }
        qr.toDataURL(data.url, (err, url) => {
            if (err) {
              console.error(err)
              return res.status(500).send("Internal Server Error")
            }
        
            res.status(200).send(`<img src="${url}"/>`) // Render the QR code image in the response
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: "An error occurred while creating qrcode."
        })
    }
}



module.exports = {
    createShortUrl,
    getLinksByUser,
    createQRCode
}


