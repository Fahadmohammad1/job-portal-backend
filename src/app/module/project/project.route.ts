import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectController } from './project.controller';
import { ProjectValidation } from './project.validation';

const router = express.Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProjectValidation.create),
  ProjectController.insertIntoDB
);
router.get('/:id', ProjectController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProjectValidation.update),
  ProjectController.updateByIdIntoDB
);
router.delete('/:id', ProjectController.deleteByIdFromDB);
router.get('/', ProjectController.getAllFromDB);

export const ProjectRoutes = router;
