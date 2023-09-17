import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { PageRoutes } from '../module/company/page/page.route';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/social-platform',
    route: SocialPlatformRoutes,
  },
  {
    path: '/page',
    route: PageRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
