import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SkillsController } from './skills.controller';
import { SkillsValidation } from './skills.validation';
const router = express.Router();
router.get('/', SkillsController.getAllFromDB);
router.post(
  '/add-skill',
  validateRequest(SkillsValidation.create),
  SkillsController.insertSkillsIntoDB
);
router.get('/:id', SkillsController.getByIdFromDB);
router.delete('/:id', SkillsController.deleteByIdFromDB);
router.patch(
  '/:id',
  validateRequest(SkillsValidation.update),
  SkillsController.updateByIdIntoDB
);

export const SkillsRoutes = router;
