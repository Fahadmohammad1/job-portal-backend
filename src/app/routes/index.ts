import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { PageRoutes } from '../module/company/page/page.route';
import { ExperienceRoutes } from '../module/experience/experience.route';
import { JobPostRouter } from '../module/job/job.route';
import { PlatformConnectionRoutes } from '../module/platformConnection/platformConnection.route';
import { ProfileRoutes } from '../module/profile/profile.route';
import { SkillsRoutes } from '../module/skills/skills.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';
import { ProjectRoutes } from '../module/project/project.route';

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
  {
    path: '/page',
    route: PageRoutes,
  },
  {
    path: '/skills',
    route: SkillsRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/platformConnection',
    route: PlatformConnectionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
