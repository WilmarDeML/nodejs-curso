import { datosDelSistema as obtenerDatosDelSistema } from './0-datosDelSistema.js'
import { detail, read as readSync } from './1-fileSystemSync.js'
import { read as readAsync } from './2-fileSystemAsync.js'
import { read as readPromises } from './3-fileSystemPromises.js'
import { read as readAsyncAwait } from './4-fileSystemPromisesAsyncAwait.js'
import { read as readParallel } from './5-fileSystemPromisesParallel.js'

// OS
console.log('Datos del sistema: ')
console.log(obtenerDatosDelSistema())

// File system Síncrono
const archivo = 'archivo.txt'
// const archivo = 'datosDelSistema.js'
console.log(`Detalles del archivo: ${archivo}`)
console.log(detail(`./archivosTxt/${archivo}`))

console.log('------Lectura síncrona--------')
console.log(`Lectura del archivo: ${archivo}`)
console.log(readSync(`./archivosTxt/${archivo}`))

const archivo2 = 'archivo2.txt'
console.log(`Lectura del archivo: ${archivo2}`)
console.log(readSync(`./archivosTxt/${archivo2}`))

// File system Promises Async/Await
console.log('------Lectura con async/await--------')
console.log(`Lectura del archivo: ${archivo}`)
console.log(await readAsyncAwait(`./archivosTxt/${archivo}`))

console.log(`Lectura del archivo: ${archivo2}`)
console.log(await readAsyncAwait(`./archivosTxt/${archivo2}`))

// File system Promises en paralelo
console.log('------Lectura en paralelo--------')
const [text1, text2] = await readParallel([`./archivosTxt/${archivo}`, `./archivosTxt/${archivo2}`])
console.log(`Lectura del archivo: ${archivo}`)
console.log(text1)
console.log(`Lectura del archivo: ${archivo2}`)
console.log(text2)

// File system Asíncrono
console.log('------Lectura asíncrona--------')
console.log(`Lectura del archivo: ${archivo}`)
readAsync(`./archivosTxt/${archivo}`)

console.log(`Lectura del archivo: ${archivo2}`)
readAsync(`./archivosTxt/${archivo2}`)

// File system Promises
console.log('------Lectura con promesas--------')
console.log(`Lectura del archivo: ${archivo}`)
readPromises(`./archivosTxt/${archivo}`)

console.log(`Lectura del archivo: ${archivo2}`)
readPromises(`./archivosTxt/${archivo2}`)
