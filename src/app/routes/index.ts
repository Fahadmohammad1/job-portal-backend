import express from 'express';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  // {
  //   path: "",
  //   routes: ""
  // },
  {
    path: '/profile',
    routes: ProfileRoutes,
  },
  {
    path: '/social-platform',
    routes: SocialPlatformRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
