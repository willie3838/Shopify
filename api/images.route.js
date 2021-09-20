import express from "express"
import ImagesController from "./images.controller.js"

const router = express.Router()

router
    .route("/")
    .get(ImagesController.apiGetImage)
    .post(ImagesController.apiAddImage)
export default router