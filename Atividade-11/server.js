const http = require('http')
const fs = require('fs').promises

const hostname = "127.0.0.1"
const port = 80

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html")
    switch (request.url) {
        case "/":
            fs.readFile('./front/index.html')
            .then(data => {
                response.writeHead(200)
                response.end(data)
            })
            .catch(err => {
                response.writeHead(500)
                response.end(err)
                return
            })
            break
        case "/sobre":
            fs.readFile('./front/sobre.html')
            .then(data => {
                response.writeHead(200)
                response.end(data)
            })
            .catch(err => {
                response.writeHead(500)
                response.end(err)
                return
            })
            break
        case "/contato/whatsapp":
            fs.readFile('./front/whats.html')
            .then(data => {
                response.writeHead(200)
                response.end(data)
            })
            .catch(err => {
                response.writeHead(500)
                response.end(err)
                return
            })
            break
        default:
            fs.readFile('./front/error.html')
            .then(data => {
                response.writeHead(404)
                response.end(data)
            })
            .catch(err => {
                response.writeHead(500)
                response.end(err)
                return
            })
        break
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})