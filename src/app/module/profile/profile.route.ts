import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
const router = express.Router();
router.get('/', ProfileController.getAllFromDB);
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.insertIntoDB
);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.myProfileFromDB
);
router.patch(
  '/update-my-profile',
  auth('USER'),
  ProfileController.updateMyProfileIntoDB
);
router.get('/:id', ProfileController.getByIdFromDB);
router.delete('/:id', ProfileController.deleteByIdFromDB);

export const ProfileRoutes = router;
