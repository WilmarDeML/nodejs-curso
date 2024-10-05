import fs from 'node:fs/promises'

export const read = async path => {
  console.log(`****Resultado async/await archivo ${path}****`)
  return await fs.readFile(path, 'utf-8')
}
