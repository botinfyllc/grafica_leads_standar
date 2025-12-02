import { Request, Response } from 'express';
import AuthServiceInstance from '../services/auth.service';
import jwtPayload from '../types/utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const user = await AuthServiceInstance.validateToken(token);
    req.user = user;
    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({ error: error.message || 'Error de validación de token' });
  }
}
