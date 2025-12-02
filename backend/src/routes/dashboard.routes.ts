import { Router } from 'express';
import authController from '../controllers/auth.controller';
import dashboardController from '../controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get('/', authController.validateToken);
dashboardRouter.get('/leads', dashboardController.getLeadsPorDia);

export default dashboardRouter;
