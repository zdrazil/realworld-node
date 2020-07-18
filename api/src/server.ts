import http = require("http")
import url = require("url")

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query
  console.log(queryObject)
  const { userName } = queryObject

  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end(`Hello ${userName || "user"}! :D How are you? \n`)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
