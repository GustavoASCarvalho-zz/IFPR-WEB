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
                response.end(error)
                return
            }
            break
        case "/sobre":
            try {
                const data = await fs.readFile('./front/sobre.html')

                response.writeHead(200)
                response.end(data)
            } catch (error) {
                response.writeHead(500)
                response.end(error)
                return
            }
            break
        case "/contato/whatsapp":
            try {
                const data = await fs.readFile('./front/whats.html')

                response.writeHead(200)
                response.end(data)
            } catch (error) {
                response.writeHead(500)
                response.end(error)
                return
            }
            break
        default:

            try {
                const data =  await fs.readFile('./front/error.html')
                response.writeHead(404)
                response.end(data)
            } catch (error) {
                response.writeHead(500)
                response.end(error)
                return
            }
        break
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})