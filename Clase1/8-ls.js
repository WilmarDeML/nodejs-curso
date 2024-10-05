import fs from 'node:fs/promises'
import path from 'node:path'
import pc from 'picocolors'

const folder = process.argv[2] ?? '.'
const files = await readFiles(folder)

const filesPromises = files?.map(async (file) => {
  const filePath = path.join(folder, file)
  const stats = await getFileInfo(filePath)
  const isDirectory = stats.isDirectory()
  const fileType = isDirectory ? 'dir' : 'file'
  const fileSize = stats.size.toString()
  const fileModified = stats.mtime.toLocaleString()
  return `  ${pc.bold(fileType)} ${pc.bold(pc.blue(file.padEnd(35)))} ${pc.bold(pc.green(fileSize.padStart(10)))} ${pc.yellow(fileModified)}
  ------------------------------------------------------------------------------`
})

const filesInfo = await Promise.all(filesPromises)

filesInfo.forEach(fileInfo => console.log(fileInfo))

async function readFiles (folder) {
  try {
    return await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}: ${error.message}`))
    process.exit(1)
  }
}

async function getFileInfo (filePath) {
  try {
    return await fs.stat(filePath) // status - información del archivo
  } catch (error) {
    console.error(pc.red(`❌ No se pudo leer el archivo ${filePath}: ${error.message}`))
    process.exit(1)
  }
}
