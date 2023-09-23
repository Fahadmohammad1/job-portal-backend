import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';
const router = express.Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ServiceValidation.create),
  ServiceController.createServiceIntoDB
);

router.get('/:id', ServiceController.getServiceByIdFromDB);
router.patch(
  '/:id',
  validateRequest(ServiceValidation.update),
  ServiceController.updateServiceByIdIntoDB
);
router.delete('/:id', ServiceController.deleteServiceByIdFromDB);
router.get('/', ServiceController.getAllServiceFromDB);

export const ServiceRoutes = router;
