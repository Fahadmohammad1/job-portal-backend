import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SubCategoryController } from './subCategory.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  SubCategoryController.createSubCategory
);
router.get('/', SubCategoryController.getAllSubCategory);
router.get('/:id', SubCategoryController.getSingleSubCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SubCategoryController.updateSubCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SubCategoryController.deleteSubCategory
);

export const SubCategoryRouter = router;
