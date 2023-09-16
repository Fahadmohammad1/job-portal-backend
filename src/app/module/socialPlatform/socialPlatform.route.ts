import express from 'express';
import { SocialPlatformController } from './socialPlatform.controller';
const router = express.Router();

router.get('/:id', SocialPlatformController.getByIdFromDB);
router.patch('/:id', SocialPlatformController.updateByIdIntoDB);
router.delete('/:id', SocialPlatformController.deleteByIdFromDB);
router.get('/', SocialPlatformController.getAllFromDB);
router.post('/', SocialPlatformController.insertIntoDB);

export const SocialPlatformRoutes = router;
