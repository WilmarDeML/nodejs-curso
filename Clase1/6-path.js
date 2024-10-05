import path from 'node:path'

console.log(path.sep) // Separador de directorios según OS

const filePath = path.join('content', 'subfolder', 'text3.txt')
console.log(`File path: ${filePath}`)

const base = path.basename(filePath)
console.log(`Base: ${base}`)

const filename = path.basename(filePath, '.txt')
console.log(`File name: ${filename}`)

const extension = path.extname(base)
console.log(`Extensión: ${extension}`)
