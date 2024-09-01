import express from 'express'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'
import documentRoutes from './routes/documentRoutes'
import collaborationRoutes from './routes/collaborationRoutes'
import versionRoutes from './routes/versionRoutes'
import notificationRoutes from './routes/notificationRoutes'

const app = express()
const port = parseInt(process.env.PORT || '3000', 10)

// Middleware
app.use(express.json())  // Middleware to parse JSON bodies
app.use(authMiddleware) // Apply authentication middleware

// Register routes
app.use('/auth', authRoutes)
app.use('/documents', documentRoutes)
app.use('/collaboration', collaborationRoutes)
app.use('/versions', versionRoutes)
app.use('/notifications', notificationRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
