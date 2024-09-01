import { Request, Response } from 'express';
import { register, login } from '../services/authService';

// Define the authController with proper error handling
const authController = {
  register: async (req: Request, res: Response) => {
    try {
      // Ensure body contains email and password
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      
      const user = await register(email, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      // Type-check the error before accessing message
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  },
  
  login: async (req: Request, res: Response) => {
    try {
      // Ensure body contains email and password
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      
      const token = await login(email, password);
      res.json({ token });
    } catch (error: unknown) {
      // Type-check the error before accessing message
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(401).json({ error: 'An unknown error occurred' });
      }
    }
  }
};

export default authController;
