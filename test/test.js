import server from "../server.js"
import dotenv from "dotenv"
import mongodb from "mongodb"
import chai from "chai"
import chaiHttp from "chai-http"
import ImagesDAO from "../dao/imagesDAO.js"

dotenv.config()

const BASE_API = "/api/v1/images"
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
                    .get(BASE_API)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        done()
                    })
            })
            
        })
    })

    describe('/POST images', () => {
        it('it should POST 1 image', (done) => {
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
                    .post(BASE_API)
                    .send(image)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        response.body.insertedCount.should.be.eql(1)
                        
                        done()
                    })
       
            })
            
        })


        it('it should POST multiple images', (done) => {
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
                    },
                    image2: {
                        url: "http://test2.com",
                        user: "test me2",
                        category: "unit tests",
                        name: "testing stuff",
                        visibility: "public"
                    }
                }

                chai.request(server)
                    .post(BASE_API)
                    .send(image)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        response.body.insertedCount.should.be.above(1)
                        done()
                    })
       
            })
            
        })
    })
})

