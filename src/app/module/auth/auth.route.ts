import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router()

router.post('/signup',validateRequest(AuthValidation.signup), AuthController.signup)
router.post('/login', validateRequest(AuthValidation.login), AuthController.login);
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPassword),
  AuthController.forgetPassword
);
router.post(
  '/reset-password',
  AuthController.resetPassword
);



export const AuthRouter = router