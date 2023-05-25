const express = require("express")
const database = require("./src/config/database")
const userRouter = require("./src/routes/userRoute")
const CONFIG = require("./src/config/config")
const bodyParser = require("body-parser")

const app = express()

database()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api/", userRouter)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to express")
})

app.listen(CONFIG.PORT, () => {
    console.log("server listening on port: ", CONFIG.PORT)
})
