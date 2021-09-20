let images

export default class ImagesDAO {
    static async injectDB(conn){
        if(images){
            return true
        }
        try{
            images = await conn.db(process.env.DB_NAME)
            return true
        }
        catch(e){
            console.error("Error establishing a connection to the database")
            return false
        }
    }

    static async getImage(filters){
        let query
        // user, category, name
        if(filters){
            query = {}
            if("user" in filters){
                query.user = { $eq: filters["user"] }
            }
            if("category" in filters){
                query.category = { $eq: filters["category"] }
            }
            if("name" in filters){
                query.name = { $eq: filters["name"] }
            }
        }

        try {
            const imageInformation = await images.collection("Images").find(query).toArray()
            const res = imageInformation.filter(img => img.visibility === "public")
            return res
        }
        catch(e){
            console.error("Get request failed, image does not exist")
        }
    }

    static async addImage(imagesList){
        try{
            console.log(imagesList)
            var res = []

            imagesList.forEach((img) => {
                res.push(img)
            })
           
            return await images.collection("Images").insertMany(res)
        }
        catch(e){
            console.error(`Unable to post image: ${e}`)
            return { error: e }
        }
    }
}