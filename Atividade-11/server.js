const http = require('http')
const fs = require('fs').promises

const hostname = "0.0.0.0"
const port = 5000

const server = http.createServer(async (request, response) => {
    response.setHeader("Content-Type", "text/html")
    switch (request.url) {
        case "/":
            try {    
                const data = await fs.readFile('./front/index.html')
                
                response.writeHead(200)
                response.end(data)   
            } catch (error) {
                response.writeHead(500)
                response.end(err)
                return
            }
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