import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';
const router = express.Router();
router.get('/', ProfileController.getAllFromDB);
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ProfileValidation.create),
  ProfileController.insertIntoDB
);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.myProfileFromDB
);
router.patch(
  '/update-my-profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ProfileValidation.update),
  ProfileController.updateMyProfileIntoDB
);
router.get('/:id', ProfileController.getByIdFromDB);
router.delete('/:id', ProfileController.deleteByIdFromDB);

export const ProfileRoutes = router;
