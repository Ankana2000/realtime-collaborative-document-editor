import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
  
  res.send('Register endpoint')
})

router.post('/login', (req, res) => {

  res.send('Login endpoint')
})

export default router
