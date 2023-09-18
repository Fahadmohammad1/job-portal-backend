import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobPostValidation } from './job.validation';
import { JobPostController } from './job.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
  '/',
  JobPostController.getAllJobPost
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  JobPostController.getSingleJobPost
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(JobPostValidation.createJobPost),
  JobPostController.createJobPostFromUser
);

router.post(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(JobPostValidation.createJobPost),
  JobPostController.createJobPostFromPage
);


router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(JobPostValidation.updateJobPost),
  JobPostController.updateJobPost
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  JobPostController.deleteJobPost
);

export const JobPostRouter = router;
