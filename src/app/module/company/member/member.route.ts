import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { MemberController } from './member.controller';
import { MemberValidation } from './member.validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(MemberValidation.create),
  MemberController.createMemberIntoDB
);

router.get('/:id', MemberController.getMemberByIdFromDB);
router.patch(
  '/:id',
  validateRequest(MemberValidation.update),
  MemberController.updateMemberByIdIntoDB
);
router.delete('/:id', MemberController.deleteMemberByIdFromDB);
router.get('/', MemberController.getAllMemberFromDB);

export const MemberRoutes = router;
