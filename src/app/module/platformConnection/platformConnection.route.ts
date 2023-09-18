import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PlatformConnectionController } from './platformConnection.controller';
import { PlatformConnectionValidation } from './platformConnection.validation';

const router = express.Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(PlatformConnectionValidation.create),
  PlatformConnectionController.insertIntoDB
);
router.get('/:id', PlatformConnectionController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(PlatformConnectionValidation.update),
  PlatformConnectionController.updateByIdIntoDB
);
router.delete('/:id', PlatformConnectionController.deleteByIdFromDB);
router.get('/', PlatformConnectionController.getAllFromDB);

export const PlatformConnectionRoutes = router;
