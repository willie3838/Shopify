import express from "express"
import cors from "cors"
import images from "./api/images.route.js"

const app = express()
app.use(express.json())

app.use("/api/v1/images", images)
app.unsubscribe("*", (req, res) => res.status(404).json({ error: "URL not found"}))
export default app