const mongoose = require("mongoose")
const CONFIG = require("./config")
// const logger = require("./logger")

async function dbSetUp() {
  mongoose.set("strictQuery", false)

  mongoose.connect(CONFIG.url)

  mongoose.connection.on("connected", () => {
    console.info("Database connected succesfully")
  })

  mongoose.connection.on("error", (error) => {
    console.info("An error occurred when connecting to database")
    console.error(error)
  })
}

module.exports = dbSetUp
