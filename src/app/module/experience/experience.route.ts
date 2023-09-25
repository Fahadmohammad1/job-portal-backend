import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ExperienceController } from './experience.controller';
import { ExperienceValidation } from './experience.validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(ExperienceValidation.create),
  auth(ENUM_USER_ROLE.USER),
  ExperienceController.insertIntoDB
);
router.get('/:id', ExperienceController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(ExperienceValidation.update),
  ExperienceController.updateByIdIntoDB
);
router.delete('/:id', ExperienceController.deleteByIdFromDB);
router.get('/', ExperienceController.getAllFromDB);

export const ExperienceRoutes = router;
