import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    route: AuthRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
