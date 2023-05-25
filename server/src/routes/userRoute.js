const express = require("express")
const { registerUser, login } = require("../controller/user.controller")


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login", login)

module.exports = userRouter
