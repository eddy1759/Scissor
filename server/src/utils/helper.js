const CONFIG = require("../config/config").jwt
const jwt = require("jsonwebtoken")
const nanoId = require("nanoid")
const qr = require("qrcode")
const fs = require("fs")
const path = require("path")


const outputDir = "../qrcodes"
const outputFileName = "qrcode.png"
const outputPath = path.join(outputDir, outputFileName)
fs.mkdirSync(outputPath, {recursive: true})

exports.generateToken = ({ payLoad }) => {
  const secret = CONFIG.secret
  const expiresIn = CONFIG.expiresIn

  return jwt.sign({ payLoad }, secret, { expiresIn })
}


exports.generateShortUrl = () => {
  return nanoId(8)
}

exports.generateQRCode = async (url) => {
  try {
    const qrCodeOpts = {
      type: "image/png",
      errorCorrectionLevel: "M",
      size: 500,
      margin: 4,
      color: {
        dark: "#000", // Dark colour
        light: "#fff" // Light Colour
      },
    }
    const qrCodeData = await qr.toFile(outputPath, url, qrCodeOpts)
    return qrCodeData
  } catch (error) {
    console.error("Error generating QR code:", error)

  }
}


