import fs from 'node:fs/promises'

export const read = (paths) => {
  return Promise.all([
    fs.readFile(paths[0], 'utf-8'),
    fs.readFile(paths[1], 'utf-8')
  ]).then((result) => {
    console.log('****Resultado archivos en paralelo****')
    return result
  })
}
