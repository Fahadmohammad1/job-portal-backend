import express from 'express';
import { UserRouter } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/users",
    route: UserRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
