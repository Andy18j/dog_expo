const jsonserver = require('json-server')


const server = jsonserver.create()
const router = jsonserver.router("db.json")
const middlewares = jsonserver.defaults()
require('dotenv').config()
const cors = require("cors")



server.use(middlewares)
server.use(router)

const port = process.env.port || 8080
server.listen(port,()=>{
    console.log(`json server is running on the ${process.env.port}`)
})

