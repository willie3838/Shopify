import app from "./server.js"
import dotenv from "dotenv"
import mongodb from "mongodb"
import ImagesDAO from "./dao/imagesDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.URI
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ImagesDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})