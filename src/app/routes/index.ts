import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter
  },{
    path: '/profile',
    routes: ProfileRoutes,
  },
  {
    path: '/social-platform',
    routes: SocialPlatformRoutes,
  },
  {
    path: '',
    routes: '',
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
