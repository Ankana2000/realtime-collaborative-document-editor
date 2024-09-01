import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

interface JwtPayload {
  id: number
}

export const register = async (email: string, password: string) => {
  
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('User already exists')
  }

 
  const hashedPassword = await bcrypt.hash(password, 10)
  

  return prisma.user.create({
    data: { email, password: hashedPassword }
  })
}

export const login = async (email: string, password: string) => {

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
  return token
}

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    
    return await prisma.user.findUnique({ where: { id: decoded.id } })
  } catch (error) {
    return null
  }
}
