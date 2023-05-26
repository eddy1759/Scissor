const express = require("express")
const bodyParser = require("body-parser")

const database = require("./src/config/database")
const userRouter = require("./src/routes/userRoute")
const CONFIG = require("./src/config/config")
const linkRouter = require("./src/routes/linksRoute")
const rateLimiter = require("./src/middleware/rateLimit")


const app = express()

database()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(rateLimiter)

app.use("/api/", userRouter)
app.use("/api/links", linkRouter)
app

app.get("/", (req, res) => {
    res.status(200).send("Welcome to express")
})

app.listen(CONFIG.PORT, () => {
    console.log("server listening on port: ", CONFIG.PORT)
})
