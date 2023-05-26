const express = require("express")
const { registerUser, login } = require("../controller/user.controller")
const User = require("../model/user")


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login", login)
userRouter.get("/users", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter
