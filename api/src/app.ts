// import { Response, Request } from "express"
import compression from "compression" // compresses requests
import bodyParser from "body-parser"
import express from "express"

const app = express()

// Express configuration
app.set("port", process.env.PORT || 3000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (_req, res) => res.send("Hello World!"))

export default app
