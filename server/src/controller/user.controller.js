const bcrypt = require("bcrypt")
const User = require("../model/user")
const helper = require("../utils/helper")


const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(403).send("Invalid request")
    }
    const {email, username, password} = req.body
    try {
        const existingUser = await User.findOne({$or: [{username}, {email}]})
        if (existingUser) {
            return res.status(403).send("username or email already exist")
        }
        const user = await User.create({email, username, password})
        if (!user) {
            return res.status(404).send("An error occurred when trying to create user")
        }
        res.status(200).send("User successfully created")
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(401).json({error: "Invalid email or password"})
        }
        
        const isMatch =  await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.status(401).json({error: "Invalid email or password"})
        }
        const token = helper.generateToken({userId: user._id})
        res.status(200).json(token)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
}



module.exports = {
    registerUser,
    login
}

