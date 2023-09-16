import express from 'express';
import { ProfileController } from './profile.controller';
const router = express.Router();

router.post('/', ProfileController.insertIntoDB);
router.get('/my-profile', ProfileController.myProfileFromDB);
router.patch('/update-my-profile', ProfileController.updateMyProfileIntoDB);
router.get('/:id', ProfileController.getByIdFromDB);
router.delete('/:id', ProfileController.deleteByIdFromDB);

export const ProfileRoutes = router;
