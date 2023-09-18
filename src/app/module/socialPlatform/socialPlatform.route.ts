import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SocialPlatformController } from './socialPlatform.controller';
import { SocialPlatformValidation } from './socialPlatfrom.validation';
const router = express.Router();
router.post(
  '/',
  validateRequest(SocialPlatformValidation.create),
  SocialPlatformController.insertIntoDB
);
router.get('/:id', SocialPlatformController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(SocialPlatformValidation.update),
  SocialPlatformController.updateByIdIntoDB
);
router.delete('/:id', SocialPlatformController.deleteByIdFromDB);
router.get('/', SocialPlatformController.getAllFromDB);

export const SocialPlatformRoutes = router;
