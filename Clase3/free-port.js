import net from 'node:net'

export const findAvailablePort = desiredPort => {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
    server.on('error', async err => {
      if (err.code === 'EADDRINUSE') {
        const port = await findAvailablePort(0)
        resolve(port)
      } else {
        reject(err)
      }
    })
  })
}

const findAvailablePort2 = async (desiredPort) => {
  const server = net.createServer()
  server.listen(desiredPort)
  const { port } = server.address()
  server.close()
  return port
}

export const findPort = async (port) => {
  try {
    const availablePort = await findAvailablePort2(port)
    return availablePort
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use.`)
      return await findPort(0)
    } else {
      console.log(`Error: ${error.message}`)
      return null
    }
  }
}
