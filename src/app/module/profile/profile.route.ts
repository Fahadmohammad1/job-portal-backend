import express from 'express';
import { ProfileController } from './profile.controller';
const router = express.Router();

router.post('/', ProfileController.insertIntoDB);

export const ProfileRoutes = router;
