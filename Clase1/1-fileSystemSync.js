import fs from 'node:fs'

export const detail = (path) => {
  const stats = fs.statSync(path)
  return {
    esArchivo: stats.isFile(),
    esDirectorio: stats.isDirectory(),
    esEnlaceSimbolico: stats.isSymbolicLink(),
    longitudEnBytes: stats.size
  }
}

export const read = (path) => {
  return fs.readFileSync(path, 'utf-8')
}
