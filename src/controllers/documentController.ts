import { Request, Response } from 'express';
import { createDocument, getDocumentById, deleteDocumentById } from '../services/documentService';

export const createDocumentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!title || !content || !userId) {
      res.status(400).json({ error: 'Title, content, and user ID are required' });
      return;
    }

    const document = await createDocument(title, content, userId);

    if (document) {
      res.status(201).json(document);
    } else {
      res.status(500).json({ error: 'Document could not be created' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getDocumentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const documentId = Number(id);

    if (isNaN(documentId)) {
      res.status(400).json({ error: 'Invalid document ID' });
      return;
    }

    const document = await getDocumentById(documentId);

    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteDocumentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const documentId = Number(id);

    if (isNaN(documentId)) {
      res.status(400).json({ error: 'Invalid document ID' });
      return;
    }

    const document = await getDocumentById(documentId);

    if (!document) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    // Optionally, you might want to check permissions here

    await deleteDocumentById(documentId);

    res.status(204).send(); // No content to send for successful deletion
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
