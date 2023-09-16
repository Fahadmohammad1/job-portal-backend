import express from 'express';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/social-platform',
    route: SocialPlatformRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
