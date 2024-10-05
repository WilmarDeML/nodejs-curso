import fs from 'node:fs'

export const read = path => {
  return fs.readFile(path, 'utf-8', (_err, text) => {
    console.log(`****Resultado asíncrono archivo ${path}****`)
    console.log(`Texto archivo ${path}: ${text}`)
    return text
  })
}
