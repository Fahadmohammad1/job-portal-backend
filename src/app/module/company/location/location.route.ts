import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { LocationValidation } from './locaiton.validation';
import { LocationController } from './location.controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(LocationValidation.create),
  LocationController.createLocationIntoDB
);

router.get('/:id', LocationController.getLocationByIdFromDB);
router.patch(
  '/:id',
  validateRequest(LocationValidation.update),
  LocationController.updateLocationByIdIntoDB
);
router.delete('/:id', LocationController.deleteLocationByIdFromDB);
router.get('/', LocationController.getAllLocationFromDB);

export const LocationRoutes = router;
