import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.updateCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRouter = router;
