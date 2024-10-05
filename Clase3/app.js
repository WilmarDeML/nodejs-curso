import express from 'express'
import { findPort } from './free-port.js'
import movies from './movies.js'
import crypto from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import cors from 'cors'

const app = express()
// Sin middleware cors
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://wilmardeml.com'
]

app.disable('x-powered-by')
app.use(cors({
  origin: (origin, cb) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return cb(null, true)
    }

    return cb(new Error('Not allowed by CORS'))
  }
}))

app.get('/movies', (req, res) => {
//      Sin meddlewar cors
//   const origin = req.header('origin')
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//   }
  const { genre } = req.query

  if (!genre) {
    return res.send(movies)
  }

  res.send(movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())))
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const foundMovie = movies.find(m => m.id === id)
  if (foundMovie) return res.send(foundMovie)
  res.status(404).send({ msg: `Película con id ${id} no encontrada` })
})

app.use(express.json())

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    const error = JSON.parse(result.error.message)
    return res.status(400).send({ error })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).send(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    const error = JSON.parse(result.error.message)
    return res.status(400).send({ error })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(m => m.id === id)

  if (movieIndex < 0) {
    res.status(404).send({ msg: `Película con id ${id} no encontrada` })
  }

  const updateMovie = { ...movies[movieIndex], ...result.data }

  movies[movieIndex] = updateMovie

  res.send(movies[movieIndex])
})

app.delete('/movies/:id', (req, res) => {
  //      Sin meddlewar cors
//   const origin = req.header('origin')
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//   }
  const { id } = req.params
  const movieIndex = movies.findIndex(m => m.id === id)

  if (movieIndex < 0) {
    return res.status(404).send({ msg: `Película con id ${id} no encontrada` })
  }

  movies.splice(movieIndex, 1)

  res.json({ msg: 'Película eliminada' })
})

// Sin middleware cors
// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT, PATCH, GET')
//   }
//   res.send()
// })

const desiredPort = process.env.PORT ?? 3000

const PORT = await findPort(desiredPort)

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
