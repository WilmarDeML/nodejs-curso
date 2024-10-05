import fs from 'node:fs/promises'

export const read = path => {
  fs.readFile(path, 'utf-8')
    .then(text => {
      console.log(`****Resultado promesas archivo ${path}****`)
      console.log(`Texto archivo ${path}: ${text}`)
    })
}
