import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Welcome to our website!' });
});

export default router;
