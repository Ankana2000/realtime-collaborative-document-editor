import WebSocket, { WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  console.log('New client connected')

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`)
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('WebSocket server running on ws://localhost:8080')
