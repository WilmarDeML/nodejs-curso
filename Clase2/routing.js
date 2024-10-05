import http, { request } from 'node:http'
import { findPort } from './free-port.js'
import ditto from './pokemon/ditto.js'
const desiredPort = process.env.PORT ?? 3000

// console.log(process.env)

const PORT = await findPort(desiredPort)

const requestManager = (req = request, res) => {
  const { method, url } = req
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  switch (method) {
    case 'GET':
      if (url === '/pokemon/ditto') {
        return res.end(JSON.stringify(ditto))
      }
      res.statusCode = 404
      return res.end(JSON.stringify({ message: 'Not found', status: res.statusCode }))

    case 'POST':
      if (url === '/pokemon') {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk.toString()
        })
        req.on('end', () => {
          console.log(body)
          const data = JSON.parse(body)
          data.timestamp = new Date().toISOString()
          res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
          return res.end(JSON.stringify(data))
        })
        return
      }
      res.statusCode = 404
      return res.end(JSON.stringify({ message: 'Not found', status: res.statusCode }))
    default:
      return res.end(JSON.stringify({ message: 'Hello Other' }))
  }
}

const server = http.createServer(requestManager)

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
