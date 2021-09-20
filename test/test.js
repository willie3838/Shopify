import server from "../server.js"
import dotenv from "dotenv"
import mongodb from "mongodb"
import chai from "chai"
import chaiHttp from "chai-http"
import ImagesDAO from "../dao/imagesDAO.js"

dotenv.config()


const MongoClient = mongodb.MongoClient

chai.should()
chai.use(chaiHttp)



chai.should()
chai.use(chaiHttp)

describe('Image APIs', () => {

    describe('/GET images', () => {
        it('it should GET all public images', (done) => {
            MongoClient.connect(
                process.env.URI
            )
            .catch(err => {
                console.error(err.stack)
                process.exit(1)
            })
            .then(async client => {
                await ImagesDAO.injectDB(client)
                chai.request(server)
                    .get("/api/v1/images")
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        done()
                    })
            })
            
        })
    })

    describe('/POST images', () => {
        it('it should POST images', (done) => {
            MongoClient.connect(
                process.env.URI
            )
            .catch(err => {
                console.error(err.stack)
                process.exit(1)
            })
            .then(async client => {
                await ImagesDAO.injectDB(client)

                let image = {
                    image1: {
                        url: "http://test.com",
                        user: "test me",
                        category: "unit tests",
                        name: "testing stuff",
                        visibility: "public"
                    }
                }

                chai.request(server)
                    .post("/api/v1/images")
                    .send(image)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        done()
                    })
            })
            
        })
    })
})

