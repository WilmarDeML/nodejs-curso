import express from 'express'
import { PORT, JWT_SECRET } from './config.js'
import UserRepository from './user-repository.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.user = token ? jwt.verify(token, JWT_SECRET) : null
  next()
})

app.get('/', (req, res) => {
  const username = req.user?.username
  res.render('index', { username })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' })
    res.cookie(
      'access_token',
      token,
      {
        httpOnly: true, // No se puede acceder a la cookie con JavaScript
        secure: process.env.NODE_ENV === 'production', // No se puede acceder a la cookie en HTTP
        sameSite: 'strict', // Sólo se puede acceder a la cookie en el mismo dominio
        maxAge: 1000 * 60 * 60 // La cookie expira en 1 hora
      }
    ).send({ user, token })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('access_token').send({ message: 'Logout successful' })
})

app.get('/profile', (req, res) => {
  const username = req.user?.username

  if (!username) {
    res.status(403).render('protected')
    return
  }

  res.render('protected', { username })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
