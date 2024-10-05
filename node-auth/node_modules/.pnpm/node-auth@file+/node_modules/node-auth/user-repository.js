import DBLocal from 'db-local'
import crypto from 'crypto'
import bycrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

const db = new DBLocal({ path: './db' })

const User = db.Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export default class UserRepository {
  static async create ({ username, password }) {
    // Validar username
    Validation.username(username)
    // Validar password
    Validation.password(password)

    // Validar existencia
    if (await User.findOne({ username })) throw new Error('Username already exists')

    // Hash password
    const hashedPassword = await bycrypt.hash(password, SALT_ROUNDS)

    // Crear usuario
    const user = await User.create({ _id: crypto.randomUUID(), username, password: hashedPassword }).save()

    return user._id
  }

  static async login ({ username, password }) {
    // Validar username
    Validation.username(username)
    // Validar password
    Validation.password(password)

    // Buscar usuario
    const user = await User.findOne({ username })
    if (!user) throw new Error('User not found')

    // Verificar contraseña
    const isValid = await bycrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
    if (username.length > 20) throw new Error('Username must be at most 20 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long')
    if (password.length > 20) throw new Error('Password must be at most 20 characters long')
  }
}
