import http, { request } from 'node:http'
import { findPort } from './free-port.js'
import { readFile } from 'node:fs'
const desiredPort = process.env.PORT ?? 3000

// console.log(process.env)

const port = await findPort(desiredPort)

const requestManager = (req = request, res) => {
  console.log('request received', req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  switch (req.url) {
    case '/':
      return res.end('<h1>Bienvenido a mi página de inicio...</h1>')
    case '/contacto':
      return res.end('<h1>Bienvenido a mi página de Contacto...</h1>')
    case '/image':
      return readFile('./36.png', (err, data) => {
        if (err) {
          res.statusCode = 404
          return res.end('<h1>Not found</h1>')
        }
        res.setHeader('Content-Type', 'image/png')
        return res.end(data)
      })
    default:
      res.statusCode = 404
      return res.end('<h1>Not found</h1>')
  }
}

const server = http.createServer(requestManager)

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
