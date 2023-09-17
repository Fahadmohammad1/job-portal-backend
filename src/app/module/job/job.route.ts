import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobPostValidation } from './job.validation';
import { JobPostController } from './job.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

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

export const JobPostRouter = router;
