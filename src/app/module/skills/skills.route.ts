import express from 'express';
import { SkillsController } from './skills.controller';
const router = express.Router();
router.get('/', SkillsController.getAllFromDB);
router.post('/add-skill', SkillsController.insertSkillsIntoDB);
router.get('/:id', SkillsController.getByIdFromDB);
router.delete('/:id', SkillsController.deleteByIdFromDB);
router.patch('/:id', SkillsController.updateByIdIntoDB);

export const SkillsRoutes = router;
