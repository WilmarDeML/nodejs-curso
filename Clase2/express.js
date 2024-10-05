import express from 'express'
import { findPort } from './free-port.js'
import ditto from './pokemon/ditto.js'

const desiredPort = process.env.PORT ?? 3000

const app = express()

app.disable('x-powered-by')

const PORT = await findPort(desiredPort)

app.use(express.json())
// app.use((req, res, next) => {
//   if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
//     return next()
//   }

//   let body = ''
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = new Date()
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send('<h1>Mi página</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.send(ditto)
})

app.post('/pokemon', (req, res) => {
  const data = req.body
  data.timestamp = new Date()
  return res.status(201).send(data)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not found</h1>')
})

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`)
})
