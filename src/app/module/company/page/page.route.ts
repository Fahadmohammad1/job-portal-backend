import express from 'express';
import { ENUM_USER_ROLE } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { PageController } from './page.controller';
import { PageValidation } from './page.validation';

const router = express.Router();

router.get('/:title', PageController.getSinglePage);

router.get('/', PageController.getAllPage);

router.post(
  '/create-page',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PageValidation.createPage),
  PageController.createPage
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PageValidation.updatePage),
  PageController.updatePage
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  PageController.deletePage
);

export const PageRoutes = router;
