import e from "express";
import ImagesDAO from "../dao/imagesDAO.js";

export default class ImagesController{
    static async apiGetImage(req, res, next){
        let filters = {}
        if(req.query.user){
            filters.user = req.query.user
        }
        if(req.query.category){
            filters.category = req.query.category
        }
        if(req.query.name){
            filters.name = req.query.name
        }

        const imageInformation = await ImagesDAO.getImage(filters)

        let response = {
            images: imageInformation
        }
        res.json(response)
    }

    static async apiAddImage(req, res, next){
        try{
            var imageList = []
            var keys = Object.keys(req.body)

            keys.forEach((el) => {
                imageList.push(req.body[el])
            })
            const imageResponse = await ImagesDAO.addImage(imageList)

            res.json({ status: "success" })
        }
        catch(e){
            res.status(500).json({ error: e.message})
        }
    }
}