import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
