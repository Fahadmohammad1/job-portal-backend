import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { CategoryRouter } from '../module/category/category.route';
import { LocationRoutes } from '../module/company/location/location.route';
import { MemberRoutes } from '../module/company/member/member.route';
import { PageRoutes } from '../module/company/page/page.route';
import { ExperienceRoutes } from '../module/experience/experience.route';
import { JobPostRouter } from '../module/job/job.route';
import { PlatformConnectionRoutes } from '../module/platformConnection/platformConnection.route';
import { ProfileRoutes } from '../module/profile/profile.route';
import { ProjectRoutes } from '../module/project/project.route';
import { ServiceRoutes } from '../module/service/service.route';
import { SkillsRoutes } from '../module/skills/skills.route';
import { SocialPlatformRoutes } from '../module/socialPlatform/socialPlatform.route';
import { SubCategoryRouter } from '../module/subCategory/subCategory.route';

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
    path: '/job-posts',
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
    path: '/categories',
    route: CategoryRouter,
  },
  {
    path: '/sub-categories',
    route: SubCategoryRouter,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/platformConnection',
    route: PlatformConnectionRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/location',
    route: LocationRoutes,
  },
  {
    path: '/member',
    route: MemberRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
