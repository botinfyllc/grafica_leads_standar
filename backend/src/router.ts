import authRouter from './routes/auth.routes';
import usersRouter from './routes/users.routes';
import dashboardRouter from './routes/dashboard.routes';
import authMiddleware from './middleware/auth.middleware';
import { Router } from 'express';

const public_router = Router();
const protected_router = Router();

public_router.use('/auth', authRouter);
public_router.use('/users', usersRouter); // Permite la creacion de usuarios sin autenticacion

protected_router.use(authMiddleware);
protected_router.use('/dashboard', dashboardRouter);

export { public_router, protected_router };
