import os from 'node:os'

export const datosDelSistema = () => {
  return {
    hostname: os.hostname(),
    username: os.userInfo().username,
    cpus: os.cpus().length,
    OS: os.platform(),
    version: os.release(),
    nodeVersion: process.version,
    v8Version: process.versions.v8,
    arquitectura: os.arch(),
    totalMemoryRAMGB: os.totalmem() / 1024 / 1024 / 1024,
    freeMemoryRAMGB: os.freemem() / 1024 / 1024 / 1024,
    usedMemoryRAMGB: (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024,
    tiempoEncendidoHours: os.uptime() / 60 / 60
  }
}
