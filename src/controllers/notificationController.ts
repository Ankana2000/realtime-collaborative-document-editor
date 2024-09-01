// src/controllers/notificationController.ts
import { Request, Response } from 'express';
import { notifyUser } from '../services/notificationService';

// Define the notificationController object
const notificationController = {
  send: async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body
      const { to, subject, text } = req.body;
      
      if (!to || !subject || !text) {
        res.status(400).json({ error: 'Recipient, subject, and message text are required' });
        return;
      }

      // Send notification
      await notifyUser(to, subject, text);
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error: unknown) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
};

export default notificationController;
