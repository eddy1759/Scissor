const CONFIG = require("../config/config").jwt
const jwt = require("jsonwebtoken")
const nanoId = require("nanoid")
// const fs = require("fs")
// const path = require("path")


// const outputDir = "../qrcodes"
// const outputFileName = "qrcode.png"
// const outputPath = path.join(outputDir, outputFileName)
// fs.mkdirSync(outputPath, {recursive: true})

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

exports.generateToken = ( userId ) => {
  const secret = CONFIG.secret
  return jwt.sign({ userId }, secret, { expiresIn: "1h" })
}


exports.generateShortString = () => {
  const generateCode = nanoId.customAlphabet(alphabet, 8)
  return generateCode()
}

// exports.generateQRCode = async (url) => {
//   try {
//     ;
//   } catch (error) {
//     console.error("QR code generation failed:", error)
//     return null
//   }
//}

exports.encodeBaseURL = (protocol, host) => {
  return `${protocol}://${host}`
}


