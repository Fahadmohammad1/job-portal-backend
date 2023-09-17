import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';
import { JobPostRouter } from '../module/job/job.route';

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
    path: '/job-post',
    route: JobPostRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
